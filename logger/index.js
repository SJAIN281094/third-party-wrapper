const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV;
const logDir = path.resolve(`./log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = format.combine(
  format.timestamp(),
  format.json(),
  format.colorize(),
  format.simple()
);

const logger = createLogger({
  level: "info",
  format: customFormat,
  defaultMeta: {
    date: new Date(),
  },
  transports: [
    new transports.File({
      filename: `${logDir}/error.log`,
      level: "error",
    }),
    new transports.File({
      filename: `${logDir}/info.log`,
      level: "info",
    }),
  ],
  silent: false,
});

if (env !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
