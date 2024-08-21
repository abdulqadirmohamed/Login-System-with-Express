const express = require('express')
const authController = require('../controller/auth.controller')
const { validateRegister } = require('../middleware/users')
const router = express.Router()

router.post('/sign-up', validateRegister, authController.singUp)
router.post('/sing-in', authController.signIn)
router.post('/secret-router', authController.secretRoute)

module.exports = router