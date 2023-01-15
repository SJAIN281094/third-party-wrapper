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
  format.simple()
);

let loggerContext = {};

const Logger = {
  getInstance: (props = {}) => {
    loggerContext = {
      date: new Date(),
      "x-request-id": uuidv4(),
      ...props.loggerContext,
    };

    delete props.loggerContext;

    const logger = createLogger({
      level: "info",
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
