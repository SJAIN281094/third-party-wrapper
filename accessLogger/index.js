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
    rotateFiles: false,
  },
}) => {
  const _createLoggingStream = () => {
    let accessLogStream;
    if (type === "file") {
      if (options.rotateFiles) {
        accessLogStream = createStream(options.fileName, {
          interval: options.interval,
          path: path.resolve(filepath),
        });
      } else {
        accessLogStream = createWriteStream(
          `${path.resolve(filepath)}/${options.fileName}`,
          {
            flags: "a",
          }
        );
      }
      return accessLogStream;
    }
  };

  return morgan(options.format, {
    stream: {
      write(line) {
        const stream = _createLoggingStream();
        stream.write(line);
        stream.end();
      },
    },
  });
};

module.exports = accessLogger;
