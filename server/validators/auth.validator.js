const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("name", "Name is required").notEmpty(),
  check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    }),
  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
