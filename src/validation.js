exports.checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({
        status: 400,
        message: "Validation failed",
        data: errors,
      });
    }
  };