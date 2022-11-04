const redisIO = require("./redis");
const rabbitMQ = require("./rabbitMQ");
const logger = require("./logger");
const accessLogger = require("./accessLogger");

module.exports = { redisIO, logger, accessLogger, rabbitMQ };
