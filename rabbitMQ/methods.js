const Logger = require("../logger");
const {
  handlers,
  prefetch,
  defaultConsumerProperties,
  defaultQueueProperties,
} = require("./defaultProperties");

let channel = null;
let client = null;
let logger = {};
const rabbitClients = [];

const methods = {
  initialize: (_client) => {
    client = _client;
    logger = Logger.getInstance();
  },

  _onConnectionError: function (error) {
    logger.error(error, "Queue connection error");
    if (handlers.onConnectionError) {
      return handlers.onConnectionError(error);
    }
  },

  _onConnectionClose: function () {
    client = null;
    channel = null;
    registerConsumer();
  },

  _closeConnection: function () {
    try {
      channel = null;
      client.close();
      client = null;
    } catch (e) {
      logger.error(e);
    }
  },

  _onChannelError: function (error) {
    logger.error(error, "Queue channel error");
  },

  _onChannelClose: function () {
    logger.info("AMQP channel closed");
    channel = null;
    if (client !== null) {
      try {
        client.close();
      } catch (e) {
        process.exit(1);
      }
    }
  },

  async listenQueue(
    queueName,
    callback,
    {
      consumerProperties = {},
      queueProperties = {},
      noOfRetriesOnError = 0,
      prefetch = 5,
    }
  ) {
    let msg = null;
    consumerProperties = {
      ...defaultConsumerProperties,
      ...consumerProperties,
    };
    queueProperties = {
      ...defaultQueueProperties,
      ...queueProperties,
    };
    try {
      rabbitClients.push(client);
      const channel = await this.getChannel({ prefetch });
      channel.assertQueue(queueName, queueProperties);
      logger.info(`Consumer registered on queue ${queueName}`);
      channel.consume(
        queueName,
        (message) => {
          logger.info(`Message received on queue ${queueName}`);
          msg = message;
          message.content = message.content.toString();
          message.content = JSON.parse(message.content);
          callback(message);
          channel.ack(message);
        },
        {
          noAck: consumerProperties.noAck,
        }
      );
    } catch (err) {
      logger.error(err);
      if (!consumerProperties.noAck && msg) {
        channel.nack(msg, false, false);
      }
      throw err;
    }
  },

  getChannel: async function (options = {}) {
    if (!channel) {
      channel = await client.createChannel();
      channel.on("error", this._onChannelError);
      channel.on("close", this._onChannelClose);
      channel.prefetch(options.prefetch || prefetch);
      return channel;
    } else {
      return channel;
    }
  },

  pushToQueue: async function (
    queueName,
    message,
    options = {},
    queueProperties = {}
  ) {
    const logger = Logger.getInstance({ loggerContext: message.loggerContext });
    try {
      channel = await this.getChannel();
      await channel.assertQueue(queueName, {
        ...defaultQueueProperties,
        ...queueProperties,
      });
      const result = await channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(message)),
        options
      );
      if (result !== true) {
        throw (
          ({
            err: error,
            params: {
              message,
              queueName,
            },
          },
          "Message send to queue error")
        );
      } else {
        logger.info(`Message Pushed To Queue ${queueName}`);
      }
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },
};

module.exports = methods;
