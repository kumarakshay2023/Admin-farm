const express = require("express")
const storesController = require('../../controllers/stores.controller')
const router = express.Router()
router.post("/register-store", storesController.registerStore);
router.post("/verify-otp",  storesController.verifyOTP);
router.post("/resend-otp",storesController.resendOTP);
router.post("/login",storesController.storeLogin);
module.exports = router