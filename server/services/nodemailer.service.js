const nodemailer = require("../config/nodemailer.config");
const template = require("../utils/MailTemplates.utils");

exports.sendEmail = async (email, type, host, data, token) => {
  let result;
  let response;

  try {
    const message = prepareTemplate(type, host, data, token);
    response = await nodemailer.sendMail(email, message);
  } catch (error) {
    console.log(error);
  }
  if (response) {
    result = response;
  }
  return result;
};

const prepareTemplate = (type, host, data, token) => {
  let message;

  switch (type) {
    case "reset":
      message = template.resetEmail(host, data);
      break;

    case "loginSuccess":
      message = template.loginSuccess(data);
      break;

    case "forgotPassword":
      message = template.forgotPassword(data);
      break;

    case "reset-confirmation":
      message = template.confirmResetPasswordEmail();
      break;

    case "signup":
      message = template.signupEmail(data, token);
      break;

    case "newsletter-subscription":
      message = template.newsletterSubscriptionEmail();
      break;

    case "contact":
      message = template.contactEmail();
      break;

    default:
      message = "";
  }

  return message;
};
