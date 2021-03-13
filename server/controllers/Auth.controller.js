const User = require("../models/User.model");
const asyncHandler = require("../helpers/asynHandler");
const nodemailer = require("../services/nodemailer.service");
const errorHandler = require('../utils/ErrorHandle.utils')

const cron = require("node-cron");
const bcrypt = require("bcrypt");
const crypt = require("crypto");

exports.signup = asyncHandler(async (req, res, next) => {
  var uuid = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var characterLength = characters.length;
  for (let i = 0; i < 6; i++) {
    uuid += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  const newUser = await User.create({ ...req.body, uuid });
  try {
    await nodemailer
      .sendEmail(newUser.email, "signup", null, newUser.name, uuid)
      .then(() => {
        res.status(200).send({
          status: "success",
          message: "Account Activation Link Sent To Your Mail",
        });
      });
    var job = cron.schedule(
      "59 * * * *",
      async () => {
        try {
          const user1 = await User.findOne({ email: newUser.email });
          if (user1.verify === false) {
            try {
              await User.findOneAndDelete({
                email: user1.email,
              });
            } catch (er) {
              console.log(er);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      { scheduled: false }
    );
    job.start();
    res.status(200).json({
      status: "success",
      message: "Verification Code sent to your email.",
    });
  } catch (err) {
    console.log(err);
    throw errorHandler(500, "Verification email cound't be sent");
  }
});
