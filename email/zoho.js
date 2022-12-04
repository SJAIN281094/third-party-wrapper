const nodeMailer = require("nodemailer");
const config = require("../config");

let transporter = nodeMailer.createTransport({
  host: config.ZOHO.host,
  secure: config.ZOHO.port,
  port: 465,
  auth: {
    user: config.ZOHO.username,
    pass: config.ZOHO.password,
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
