const nodeMailer = require("nodemailer");
const config = require("../config");

let transporter = nodeMailer.createTransport({
  name: config.EMAIL_SERVER.ZOHO.name,
  host: config.EMAIL_SERVER.ZOHO.host,
  secure: config.EMAIL_SERVER.ZOHO.secure,
  port: config.EMAIL_SERVER.ZOHO.port,
  auth: {
    user: config.EMAIL_SERVER.ZOHO.username,
    pass: config.EMAIL_SERVER.ZOHO.password,
  },
});

const sendZohoMail = async (mailOptions) => {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

module.exports = { sendZohoMail };
