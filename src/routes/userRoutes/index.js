const express = require("express")
const usersController = require('../../controllers/user.controller')
const router = express.Router()
let { validateUser } = require("../../middlewares/validators/users");
router.post("/register-user", validateUser, usersController.registerUser);
router.post("/verify-otp",  usersController.verifyOTP);

module.exports = router