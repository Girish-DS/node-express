const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => { 
    try {
        const right = jwt.verify(req, process.env.HASH_KEY)
        if (right === null || !right) return false;
        return {success: true, forgetPassword: right.forgetPassword ? right.forgetPassword : false};
    } catch (error) {
        return {success: false};
    }
}

const getToken = (req, res, next) => {
    try {
        const token = jwt.sign(req, process.env.HASH_KEY, {expiresIn: "10m"});
        return token;
    } catch (error) {
        return error;
    }
}

module.exports = { verifyToken, getToken };