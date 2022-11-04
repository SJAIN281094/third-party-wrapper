const config = {
  REDIS: {
    host: "127.0.0.1",
    post: 6379,
    password: "",
  },
  RABBITMQ_CONNECTION_URL: "amqp://user:password@localhost:5672?heartbeat=60",
};

module.exports = config;
