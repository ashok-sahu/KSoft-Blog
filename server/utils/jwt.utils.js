const jwt = require("jsonwebtoken");
const createError = require("./ErrorHandle.utils");

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw createError(401, "Token is expired. Please Login");
    throw error;
  }
};

const genAuthToken = () => {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};

module.exports = {
  genAuthToken,
  verifyToken,
};
