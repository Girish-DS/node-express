const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const adminService = require('../service/admin');
const jwt = require('../authenticate/authentication');


class authController {
    signup = async (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) return
    
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (name == '' || email == '' || password == '') {
            res.status(202).json({ error: 'Please fill the required fields' })
            return
        } 
    
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
    
            const adminDetails = {
                name: name,
                email: email,
                password: hashedPassword
            }
            
            const admin = await this.adminService.save(adminDetails).then((data) => {

            });

            console.log('admin: ', admin);
            if (admin) {
                res.status(200).json({ success: true, message: 'User registered successfully!' });
            } else {
                res.status(201).json({ success: false, message: 'Sorry, something went wrong' });
            }
    
        } catch (err) {
            if(!err.statusCode) err.statusCode = 400;
            res.status(400).json({ success: false, message: "Please provide valid email and valid password" });
        }
    }
    
    login = async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const admin = await adminService.find(email);
            const isValid = bcrypt.compareSync(password, admin?.password);
            if(isValid) {
                const adminLogin = {
                    name: admin.name,
                    email: admin.email
                }
                const accessToken = jwt.sign(adminLogin, "12#456a", {expiresIn: '100m'});
                   res.json({
                       accessToken : accessToken
                   })
            } else {
                res.status(400).json({ success: false, message: "Invalid Password" });
            }
        } catch(err) {
            res.status(400).json({ success: false, message: "Please provide valid email and valid password" });
        }
    }

    forgetPassword = async (req, res, next) => {
        try {
            const email = req.body.email;
            await adminService.findAll().then((res) => {
                return res.status(200).json({success: true, result: res, message: "Data fetched successfully"});
            }).catch((err) => {
                return res.status(400).json({success: false, result: err, message: "Something went wrong"});
            });
            // admins.forEach(mail => {
            //     if(mail.email === email) {
            //         return "Email is there";
            //     }
            //     return "No such email";
            // });
        } catch (err) {
            return err;
        }
    }

    resetPassword = async (req, res, next) => {}
}

module.exports = new authController();