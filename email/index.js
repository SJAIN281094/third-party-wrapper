const methods = require("./methods");
const DEFAULT_PROPERTIES = { channel: "zoho" };

function Email(defaultProps) {
  const initialize = (props = {}) => {
    const properties = { ...defaultProps, ...props };
    return methods({ channel: properties.channel });
  };
  return { initialize };
}

module.exports = Email(DEFAULT_PROPERTIES);
