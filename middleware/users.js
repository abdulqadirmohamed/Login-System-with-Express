// middleware/users.js

const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    validateRegister: (req, res, next) => {

        // Check for email presence
        if (!req.body.email) {
            return res.status(400).send({
                message: 'Please enter an email address',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).send({
                message: 'Please enter a valid email address',
            });
        }

        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: 'Please enter a password with min. 6 chars',
            });
        }
        // password (repeat) must match
        if (!req.body.password_repeat || req.body.password != req.body.password_repeat
        ) {
            return res.status(400).send({
                message: 'Both passwords must match',
            });
        }

        // Token validation
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Invalid Token..."
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Access Denied! Unauthorized User"
            });
        }
        next();
    }
};