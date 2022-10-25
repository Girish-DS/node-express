const express = require('express');
const router = express.Router();
const authController = require('../src/controllers/auth-controller');

// router.post('/signup', [
//     // body('name').trim().not().notEmpty(),
//     // body('email').isEmail().withMessage('Please enter the valid email.').custom(
//     //     async (email) => { 
//     //         const admin = await Admin.find(email);
//     //         if(admin[0].length > 0) return Promise.reject('This email is already exist!');  
//     //     }).normalizeEmail(),
//     // body('password').trim().isLength({ min: 7 })
// ]);

router.post('/signup', authController.signup);
router.get('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.post('/forget-password', authController.forgetPassword);

module.exports = router;