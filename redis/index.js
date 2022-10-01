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
const config = require("../config");

const redisIO = (redis) => {
  let client;
  const defaultTTL = 24 * 60 * 60;

  function stringifyObj(obj) {
    if (typeof obj === "string") {
      return obj;
    }
    try {
      return JSON.stringify(obj);
    } catch (e) {
      return obj;
    }
  }

  const connect = () => {
    try {
      if (!client) {
        client = redis.createClient({
          socket: {
            host: config.REDIS.host,
            port: config.REDIS.port,
          },
        });
        client.on("error", (err) => {
          throw err;
        });
        client.connect();
        return client;
      }
    } catch (err) {
      console.log("Error while connectinf redis " + err);
      throw err;
    }
  };

  const getClient = () => {
    if (client) {
      return client;
    } else {
      const redisClient = connect();
      return redisClient;
    }
  };

  /**
   * WORKS ON STRING
   */
  const SET = async (key, value, expiry) => {
    try {
      const result = await client.set(key, stringifyObj(value), {
        EX: expiry ? expiry : defaultTTL,
      });
      if (result !== "OK") {
        throw "Error setting value in redis";
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const GET = async (key) => {
    try {
      return await client.get(key);
    } catch (error) {
      throw error;
    }
  };

  const DEL = async (key) => {
    try {
      return await client.get(key);
    } catch (error) {
      throw error;
    }
  };

  const INCRBY = async (key, incrementBy = 1) => {
    try {
      return await client.incr(key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const DECRBY = async (key, decrementBy = 1) => {
    try {
      return await client.decrby(key, decrementBy);
    } catch (error) {
      throw error;
    }
  };

  const INCRBYFLOAT = async (key, incrementBy = 0) => {
    try {
      return await client.incrbyfloat(key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  /**
   * WORKS ON HASH (Object with no nesting key-value pair)
   */

  //HSET convert each value of obj to string by .toString() method
  const HSET = async (name, obj, expiry) => {
    try {
      if (typeof obj !== "object") {
        throw "Value must be an object";
      }
      const result = await client.hSet(name, obj, {
        EX: expiry ? expiry : defaultTTL,
      });
      if (result !== "OK") {
        throw "Error setting value in redis";
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Find particular key from hash
  const HGET = async (name, key) => {
    try {
      return await client.hGet(name, key);
    } catch (error) {
      throw error;
    }
  };

  // Find all keys from hash
  const HGETALL = async (name) => {
    try {
      const result = await client.hGetAll(name);
      if (Object.keys(result).length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const HEXISTS = async (name, key) => {
    try {
      return await client.hExists(name, key);
    } catch (error) {
      throw error;
    }
  };

  const HDEL = async (name, key) => {
    try {
      return await client.hDel(name, key);
    } catch (error) {
      throw error;
    }
  };

  const HINCRBY = async (name, key, incrementBy = 1) => {
    try {
      return await client.hincr(name, key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const HDECRBY = async (name, key, decrementBy = 1) => {
    try {
      return await client.hdecrby(name, key, decrementBy);
    } catch (error) {
      throw error;
    }
  };

  const HINCRBYFLOAT = async (name, key, incrementBy = 0) => {
    try {
      return await client.hincrbyfloat(name, key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const HSTRLEN = async (name, key) => {
    try {
      return await client.hStrLen(name, key);
    } catch (error) {
      throw error;
    }
  };

  const HKEYS = async (name) => {
    try {
      return await client.hkeys(name);
    } catch (error) {
      throw error;
    }
  };

  const HVALUES = async (name) => {
    try {
      return await client.hVals(name);
    } catch (error) {
      throw error;
    }
  };

  return {
    connect,
    getClient,
    SET,
    GET,
    DEL,
    INCRBY,
    DECRBY,
    INCRBYFLOAT,
    HSET,
    HGET,
    HGETALL,
    HEXISTS,
    HDEL,
    HINCRBY,
    HDECRBY,
    HINCRBYFLOAT,
    HKEYS,
    HVALUES,
    HSTRLEN,
  };
};

module.exports = redisIO(redis);
