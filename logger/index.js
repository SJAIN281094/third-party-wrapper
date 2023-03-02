const { createLogger, transports, format } = require("winston");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const logDir = path.resolve(`./log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = format.combine(
  format.timestamp(),
  format.json(),
  format.printf(({ level, message, label, timestamp, ...props }) => {
    return JSON.stringify({
      level,
      timestamp,
      "x-request-id": props["x-request-id"],
      message,
      ...props,
    });
  })
);

let loggerContext = {};

const Logger = {
  getInstance: (props = {}) => {
    loggerContext = {
      "x-request-id": uuidv4(),
      ...props.loggerContext,
    };

    delete props.loggerContext;

    const logger = createLogger({
      level: "http",
      format: customFormat,
      defaultMeta: {
        ...loggerContext,
        ...props,
      },
      transports: [new transports.Console()],
      silent: false,
    });

    logger.getContext = () => {
      return loggerContext;
    };

    return logger;
  },
};

module.exports = Logger;
