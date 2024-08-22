// middleware/users.js

const jwt = require("jsonwebtoken");

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
        next();
    }
};