const { sendZohoMail } = require("./zoho");

function methods({ channel }) {
  const sendMail = ({ from, to, subject, content }) => {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: content,
    };

    if (channel === "zoho") {
      return sendZohoMail(mailOptions);
    }
  };
  return { sendMail };
}

module.exports = methods;
