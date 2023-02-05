const { RABBITMQ_PASSWORD, RABBITMQ_USERNAME } = require("./values");
const Logger = require("../logger");

if (!RABBITMQ_USERNAME || !RABBITMQ_PASSWORD) {
  const logger = Logger.getInstance();
  logger.error("Env variable not set");
  process.exit(1);
}

const config = {
  REDIS: {
    host: "localhost",
    post: 6379,
    password: "",
  },
  RABBITMQ_CONNECTION_URL: `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@rabbitmq-api.hiringseed.com?heartbeat=60`,
  EMAIL_SERVER: {
    ZOHO: {
      name: "linode",
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      username: "er.sjain28@gmail.com",
      password: "zoho@1234",
    },
  },
};

module.exports = config;
