const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const jwt = require('../authenticate/authentication');


class authController {
    signup = async (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) return
    
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
    
            const adminDetails = {
                name: name,
                email: email,
                password: hashedPassword
            }
            
            const admin = await Admin.save(adminDetails);

            console.log('admin: ', admin);
    
            res.status(201).json({ message: 'User registered!' })
        } catch (err) {
            if(!err.statusCode) err.statusCode = 500;
        }
    }
    
    login = async (req, res, next) => {
        const email = req.query.email;
        const password = req.query.password;
        const admin = await Admin.find(email);
        try {
            const isValid = bcrypt.compareSync(password, admin?.password);
            if(isValid) {
                const adminLogin = {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                }
                const accessToken = jwt.sign(adminLogin, "12#456a");
                   res.json({
                       accessToken : accessToken
                   })
            } else {
                res.status(400).json({ error: true, message: "Invalid Password" });
            }
        } catch(err) {
            res.status(400).json({ error: true, message: "Please provide valid email and valid password" });
        }
    }

    forgetPassword = async (req, res, next) => {}

    newPassword = async (req, res, next) => {}
}

module.exports = new authController();