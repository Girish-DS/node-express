const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const adminService = require('../service/adminService');
const adminInstance = new adminService();
const authenticate = require('../../util/authenticate/authentication');
// const genToken = new authenticate();

class authController {

    signup = async (req, res, next) => {
        try {

            const error = validationResult(req);
            if (!error.isEmpty()) return

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            if (name == '' || email == '' || password == '') {
                res.status(202).json({ error: 'Please fill the required fields' })
                return
            }

            const user = await adminInstance.find(email);
            if (!user.length) {
                let hashedPassword = await bcrypt.hash(password, process.env.HASH_ROUNDS);

                const adminDetails = {
                    name: name,
                    email: email,
                    password: hashedPassword
                }

                const admin = await adminInstance.save(adminDetails);

                if (admin) {
                    res.status(200).json({ success: true, message: 'User registered successfully!' });
                } else {
                    res.status(201).json({ success: false, message: 'Sorry, something went wrong' });
                }
            } else {
                return res.status(400).json({ success: false, message: "User already exist." })
            }

        } catch (err) {
            if (!err.statusCode) err.statusCode = 400;
            res.status(400).json({ success: false, message: "Please provide valid email and valid password" });
        }
    }

    login = async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const admin = await adminInstance.find(email);
            if (admin.length !== 0) {
                if (bcrypt.compareSync(password, admin[0]?.password)) {
                    const adminLogin = {
                        name: admin[0]?.name,
                        email: admin[0]?.email
                    }
                    const accessToken = await authenticate.getToken(adminLogin);
                    res.status(200).json({
                        success: true,
                        accessToken: accessToken,
                        message: "Successfully Logged in"
                    })
                } else {
                    res.status(400).json({ success: false, message: "Invalid Password" });
                }
            } else {
                res.status(400).json({ success: false, message: "No user available with this email" });
            }
        } catch (err) {
            res.status(400).json({ success: false, result: err.message, message: "Please provide valid email and valid password" });
        }
    }

    forgetPassword = async (req, res, next) => {
        try {
            const email = req.body.email;
            const admin = await adminInstance.find(email);
            if (admin.length !== 0) {
                const adminDetails = {
                    id: admin[0].id,
                    name: admin[0].name,
                    email: admin[0].email,
                    password: admin[0].password,
                    forgetPassword: true
                }

                const token = await authenticate.getToken(adminDetails);
                const link = `http://localhost:1312/auth/reset-password?id=${admin[0].id}&token=${token}`;
                return res.status(200).json({ success: true, result: link, message: "Reset password link" })
            } else {
                return res.status(400).json({ success: false, message: "No user with this email" });
            }
        } catch (err) {
            console.log('forget: ', err);
            return res.status(400).json({ success: false, message: "No user with this email" });
        }
    }

    resetPassword = async (req, res, next) => {
        try {
            const id = req.query.id;
            const email = req.params.email ? req.params.email : req.body.email;
            const token = req.query.token ? req.query.token : req.body.token;
            let admin;

            const verify = await authenticate.verifyToken(token);

            if (email) {
                admin = await adminInstance.find(email);
            } else if (id) {
                admin = await adminInstance.findById(id);
            }

            const checkPwd = verify.forgetPassword ? await bcrypt.compare(req.body.oldPassword, admin[0]?.password) : true;

            if (admin.length && checkPwd) {
                const pwd = req.body.password;
                const conf_pwd = req.body.conf_pwd;
                if (pwd === conf_pwd) {
                    if (verify.success) {
                        const salt = await bcrypt.genSalt(Number(process.env.HASH_ROUNDS));
                        let hashedPassword = await bcrypt.hash(conf_pwd, salt);
                        const update = await adminInstance.updatePassword(id, hashedPassword);

                        if (update) {
                            return res.status(200).json({ success: true, message: "Updated successfully" });
                        } else {
                            return res.status(400).json({ success: false, message: "Something went wrong" });
                        }

                    } else {
                        return res.status(205).json({ success: false, message: "Token expired" });
                    }
                } else {
                    return res.status(205).json({ success: false, message: "Given new password is not same" });
                }
            } else {
                return res.status(400).json({ success: false, message: "No such user in the server" })
            }
        } catch (err) {
            return res.status(500).json({ success: false, result: err, message: "Something went wrong, please try again" });
        }
    }
}

module.exports = new authController();