// @ts-nocheck
/**
 * Design Consideration
 * 1. Type of data are we storing
 * 2. Size of data
 * 3. Expiry
 * 4. Key naming policy
 * 5. Any business logic concern
 */

/**
 * Key naming
 * 1. Should be unique
 * 2. Understandable name
 * 3. Use ':' to separate diffrent part of key
 */

const redis = require("redis");
const methods = require("./methods");
const config = require("../config");

const defaultReconnectStrategy = function (retries) {
  return Math.min(retries * 200, 5000);
};

const redisIO = (redis) => {
  let client;
  let isConnected = false;

  /**
   * @param {object} options
   * @param {object=} options.reconnectStrategy
   * @param {string=} options.host
   * @param {string=} options.post
   */
  function connect(options = {}) {
    if (!client) {
      client = redis.createClient({
        socket: {
          reconnectStrategy:
            options.reconnectStrategy || defaultReconnectStrategy,
          host: options.host || config.REDIS.host,
          port: options.port || config.REDIS.port,
        },
      });

      client.connect();

      client.on("error", (error) => {
        isConnected = false;
      });

      client.on("ready", () => {
        isConnected = true;
      });

      client.on("reconnecting", () => {
        isConnected = false;
      });
    }
    return methods(client, isConnected);
  }

  return { connect };
};

module.exports = redisIO(redis);
