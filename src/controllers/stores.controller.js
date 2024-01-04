const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { tables } = require('../db/index');
const { asyncHandler } = require('../utils/catchError')
const AppError = require("../utils/appError");
const jwt = require('jsonwebtoken')

function generateOtp() {
    if (process.env.DUMMY_OTP) {
        return process.env.DUMMY_OTP;
    } else {
        const otp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
        const otpString = otp.join("");
        return otpString;
    }
}

exports.registerStore = asyncHandler(async (req, res) => {
    let existingStore = await tables.Stores.findAll({
        where: {
          [Op.or]: [
            { email: req.body.email },
            { mobile: req.body.mobile }
          ]
        }
      });
    existingStore.some((i) => {
        if (i.email === req.body.email && i.is_email_verified === true) {
            throw new AppError("Email Already taken!", 400);
        }
    });

    existingStore.some((i) => {
        if (parseInt(i.mobile) === req.body.mobile) {
            throw new AppError("Mobile Already Exist!", 400);
        }
    });

    req.body.password = await bcrypt.hash(req.body.password, 10);
    if (existingStore.length > 0) {
        await tables.Stores.update(req.body, {
            where: { id: existingStore[0].id },
        });
        await tables.Otp.create({
            store_id: existingStore[0].id,
            otp: generateOtp(),
            expires_at: Date.now() + 300000,
        });
    } else {
        const store = await tables.Stores.create(req.body);
        await tables.Otp.create({
            store_id: store.id,
            email: store.email,
            otp: generateOtp(),
            expires_at: Date.now() + 300000,
        });

    }

    return res.send({
        status: true,
        statusCode: 200,
        message: "OTP sent successfully.",
    });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { otp, email } = req.body;
    const store = await tables.Stores.findOne({ where: { email: email }, attributes:{exclude:['password']}, raw: true });
    if (!store) {
        throw new AppError("Email or Mobile Does Not Exist!", 400);
    }
    const OTP = await tables.Otp.findOne({
        where: { store_id: store.id },
        raw: true,
        order: [["created_at", "DESC"]],
    });
    if (!OTP || otp !== OTP.otp) {
        throw new AppError("Otp Does Not Matched!", 400);
    } else if (Date.now() >= OTP.expires_at) {
        throw new AppError("Otp Expired!", 400);
    } else {
        const token = jwt.sign(
            { id: store.id, email: store.email },
            process.env.STORE_TOKEN_KEY,
            { expiresIn: "30d" }
        );
        store.token = token;
        if (email) {
            await tables.Stores.update(
                { is_email_verified: true },
                { where: { email: email } }
            );
        }

        await tables.Otp.update({ expires_at: 0 }, { where: { store_id: store.id } });
        return res.send({
            status: true,
            statusCode: 200,
            message: "OTP Verified Successfully",
            store,
        });
    }
});

exports.resendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const store = await tables.Stores.findOne({ where: { email: email } });
    if (!store) {
        throw new AppError("Store not found!", 400);
    }
    await tables.Otp.update(
        { otp: generateOtp(), expires_at: Date.now() + 300000 },
        { where: { store_id: store.id } }
    );

    return res.send({
        status: true,
        statusCode: 200,
        message: "OTP Resend Successfully",
    });
});


exports.storeLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const store = await tables.Stores.findOne({
      where: { email: email, is_email_verified: true },
      raw: true,
   
    });
    if (!store) {
      throw new AppError("Store Not Registered!", 400);
    }
    const checkPassword = await bcrypt.compare(password, store.password);
    if (!checkPassword) {
      throw new AppError("Incorrect Password or Email!", 400);
    }
    const token = jwt.sign(
      { id: store.id, email: store.email },
      process.env.STORE_TOKEN_KEY,
      { expiresIn: "30d" }
    );
    if (!token) {
      throw new AppError("Something Went Wrong!", 400);
    }
    store.token = token;
    return res.send({
      status: true,
      statusCode: 200,
      store,
      message: "Store login Successfully",
    });
  });