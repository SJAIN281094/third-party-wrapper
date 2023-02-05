const values = require("./values");
const Logger = require("../logger");

if (!values) {
  const logger = Logger.getInstance();
  logger.error("Env. variable not set");
  process.exit(1);
}

logger.info("ENV_VALUES", values);

const {
  RABBITMQ_HOST,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  ZOHO_NAME,
  ZOHO_HOST,
  ZOHO_PORT,
  ZOHO_SECURE,
  ZOHO_USERNAME,
  ZOHO_PASSWORD,
} = values;

const config = {
  REDIS: {
    host: REDIS_HOST,
    post: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
  RABBITMQ_CONNECTION_URL: `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}?heartbeat=60`,
  EMAIL_SERVER: {
    ZOHO: {
      name: ZOHO_NAME,
      host: ZOHO_HOST,
      port: ZOHO_PORT,
      secure: ZOHO_SECURE,
      username: ZOHO_USERNAME,
      password: ZOHO_PASSWORD,
    },
  },
};

module.exports = config;
