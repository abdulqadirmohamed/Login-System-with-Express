const express = require('express')
const authController = require('../controller/auth.controller')
const { validateRegister } = require('../middleware/users')
const router = express.Router()

// router.post('/sign-up',  authController.signUp)
router.post("/sign-up", validateRegister, authController.signUp)


module.exports = router