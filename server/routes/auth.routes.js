const router = require("express").Router();
const { signup } = require("../controllers/Auth.controller");
const {
  isRequestValidated,
  signupValidator,
} = require("../validators/auth.validator");

router.post("/signup", signupValidator, isRequestValidated, signup);

module.exports = router;
