const nodemailer = require("nodemailer");

exports.sendMail = async (receipient, message) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: "ashoksahu1105@gmail.com",
      pass: "ashok$1111",
    },
    tls: {
      rejectUnauthorized: false,
    },
    requireTLS: true,
  });

  const data = {
    from: `KSoft Solution <${process.env.NODEMAILER_EMAIL_FROM}>`,
    to: receipient,
    subject: `${message.subject}`,
    text: `${message.text}`,
    html: `${message.html}`,
  };

  await transporter
    .sendMail(data)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
