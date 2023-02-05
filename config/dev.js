const config = {
  REDIS: {
    host: "localhost",
    post: 6379,
    password: "",
  },
  RABBITMQ_CONNECTION_URL: "amqp://guest:guest@localhost:5672?heartbeat=60",
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
