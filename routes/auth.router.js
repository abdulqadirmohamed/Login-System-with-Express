const express = require("express");
const authController = require("../controller/auth.controller");
const { validateRegister } = require("../middleware/input_validation");
const {checkToken} = require("../middleware/token_validation")
const router = express.Router();

router.post("/sign-up", checkToken, validateRegister, authController.signUp);
router.post("/sign-in", authController.signIn);

router.get("/users", checkToken, authController.getAll);

module.exports = router;
