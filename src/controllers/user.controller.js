let {checkValidation} = require('../validation');
const bcrypt = require("bcryptjs");
const { tables } = require('../db/index');
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res, next) => {
    try {
      let checkValidations = await checkValidation(req, res);
      if(checkValidations) return;
        let checkUserName = await tables.Users.findOne({where:{username: req.body.username,is_email_verified:true}});
            if (checkUserName) {
                return res.send({
                status: true,
                statusCode: 402,
                message: "Username Already taken!",
                });
            }
        let checkUser = await tables.Users.findOne({where:{email: req.body.email,is_email_verified:true}});
            if (checkUser) {
                return res.send({
                status: true,
                statusCode: 402,
                message: "User Already Exist!",
                });
            }
           req.body.password = bcrypt.hashSync(req.body.password, 10)
            await tables.Users.create(req.body);
            // need to send OTP on email 
            return res.send({
            status: true,
            statusCode: 200,
            message: "User has created successfully.",
            });
    } catch (error) {
      return res.send({
        status: false,
        statusCode: 500,
        message: "Something Went Wrong!",
      });
    }
  };

exports.verifyOTP = async (req, res) => {
    try {
        const { otp, email } = req.body
        const user = await tables.Users.findOne({ where: { email }, raw: true })
        if(!user) return res.send({ status: true, statusCode: 404, message: "Email Does Not Exist!" })
        const OTP = await tables.Otp.findOne({ where: { user_id:user.id }, raw: true })
        if (otp === OTP.otpMobile) {
            if (Date.now() <= OTP.expiryTimeMobile) {
                const token = jwt.sign({ id: user.id, email: user.email }, config.TOKEN_KEY, { expiresIn: "30d", })
                user.token = token
                return res.send({ status: true, statusCode: 200, message: "OTP Verified Successfully",user })
            } else return res.send({ status: true, statusCode: 400, message: "Otp Expired!" })
        } else return res.send({ status: true, statusCode: 400, message: "Invalid OTP!" })
    } catch (error) {
        return res.send({
        status: false,
        statusCode: 500,
        message: "Something Went Wrong!",
        });
    }
}