const { body } = require("express-validator");

exports.validateUser = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
  body("mobile")
    .exists()
    .withMessage("mobile is required")
    .notEmpty()
    .withMessage("mobile must be filled"),
];

