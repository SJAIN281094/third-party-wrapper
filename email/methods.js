const { sendZohoMail } = require("./zoho");
const Logger = require("../logger");

function methods({ channel, loggerContext }) {
  const logger = Logger.getInstance({ loggerContext });
  try {
    const sendMail = ({ from, to, subject, html, attachments, text }) => {
      const mailOptions = {
        from: {
          name: from.name || "Hiring Seed",
          address: from.address,
        },
        to: to,
        subject: subject,
        attachments: attachments,
        html: html,
        text: text,
      };
      if (channel === "zoho") {
        return sendZohoMail(mailOptions);
      }
    };
    return { sendMail };
  } catch (err) {
    logger.error(err);
  }
}

module.exports = methods;
