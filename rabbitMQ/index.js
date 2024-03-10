const amqplib = require("amqplib");
const config = require("../config");
const Queues = require("./queues");
const methods = require("./methods");

const rabbitMQ = (amqplib) => {
  let client;
  let isConnected = false;

  /**
   * @param {object} options
   * @param {string=} options.rabbitMQConnectionUrl
   */
  async function connect(options = {}) {
    try {
      if (!client) {
        client = await amqplib.connect(
          options.rabbitMQConnectionUrl || config.RABBITMQ_CONNECTION_URL
        );
        client.on("error", () => {
          isConnected = false;
        });
        client.on("close", () => {
          isConnected = false;
        });
        isConnected = true;
        methods.initialize(client);
        return client;
      }
    } catch (err) {
      throw err;
    }
  }

  async function listenQueue(queueName, callback, properties = {}) {
    if (!isConnected) {
      throw new Error("consumer client is not setup");
    }
    return await methods.listenQueue(queueName, callback, properties);
  }

  async function pushToQueue(
    queueName,
    message,
    options = {},
    queueProperties = {}
  ) {
    if (!isConnected) {
      throw new Error("publisher client is not setup");
    }
    if (options.noOfRetries === undefined) {
      options.noOfRetries = 0;
    }
    if (options.persistent === undefined) {
      options.persistent = true;
    }
    return await methods.pushToQueue(
      queueName,
      message,
      options,
      queueProperties
    );
  }

  return { connect, Queues, pushToQueue, listenQueue };
};

module.exports = rabbitMQ(amqplib);
