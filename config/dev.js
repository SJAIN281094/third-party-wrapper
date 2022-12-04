const config = {
  REDIS: {
    host: "127.0.0.1",
    post: 6379,
    password: "",
  },
  RABBITMQ_CONNECTION_URL: "amqp://user:password@localhost:5672?heartbeat=60",
  ZOHO: {
    host: "smtp.zoho.in",
    port: 465,
    username: "er.sjain218@gmail.com",
    password: "zoho@1234",
  },
};

module.exports = config;
