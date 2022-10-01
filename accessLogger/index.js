var morgan = require("morgan");
var { createStream } = require("rotating-file-stream");
var { createWriteStream } = require("fs");
var path = require("path");

const accessLogger = ({
  type = "file",
  filepath = "./log",
  options = {
    fileName: "access.log",
    interval: "1d",
    format: "combined",
    enableRotateFile: true,
  },
}) => {
  let accessLogStream;

  if (type === "file") {
    if (options.enableRotateFile) {
      // Create new log file on every interval
      accessLogStream = createStream(options.fileName, {
        interval: options.interval,
        path: path.resolve(filepath),
      });
    } else {
      accessLogStream = createWriteStream(
        path.join(__dirname, options.fileName),
        {
          flags: "a",
        }
      );
    }
    return morgan(options.format, { stream: accessLogStream });
  }
};

module.exports = accessLogger;
