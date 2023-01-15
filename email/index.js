const methods = require("./methods");
const Logger = require("../logger");
const DEFAULT_PROPERTIES = { channel: "zoho" };

function Email(defaultProps) {
  try {
    const initialize = (props = {}) => {
      if (!props.loggerContext) {
        throw "Logger context not provided";
      }
      const properties = { ...defaultProps, ...props };
      return methods({
        channel: properties.channel,
        loggerContext: properties.loggerContext,
      });
    };
    return { initialize };
  } catch (err) {
    const logger = Logger.getInstance();
    logger.error(err);
  }
}

module.exports = Email(DEFAULT_PROPERTIES);
