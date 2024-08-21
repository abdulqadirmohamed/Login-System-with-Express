const jwb = require('jsonwebtoken')

module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if (!req.body.username || req.body.username < 3) {
            return res.status(400).send({
                message: "Please enter a username with min. 3 chars"
            });
        }
        // password min 6 charecters
        if (!req.body.password || req.body.password < 6) {
            return res.status(400).send({
                message: "Please enter a password with min. 6 chars"
            })
        }
        // password repeat must match
        if (!req.body.repeatPass || req.body, repeatPass != req.body.password) {
            return res.status(400).send({
                message: "Password do not much"
            })
        }
        next();
    },
    isLoginIn: () => { }
}