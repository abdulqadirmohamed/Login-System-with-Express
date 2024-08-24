const express = require('express')
const authController = require('../controller/auth.controller')
const { validateRegister } = require('../middleware/users')
const router = express.Router()


router.post("/sign-up", validateRegister, authController.signUp)
router.post('/sign-in', authController.signIn)

router.get('/users', authController.getAll)


module.exports = router