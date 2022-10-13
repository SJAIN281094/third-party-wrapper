const { mapValues, isEmpty } = require("lodash");

const defaultTTL = 24 * 60 * 60;

function parseVal(val) {
  if (typeof val !== "string") {
    return val;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}

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

function parseObj(obj) {
  if (!obj || isEmpty(obj)) return obj;
  return mapValues(obj, (item) => parseVal(item));
}

function stringifyObjValues(obj) {
  return mapValues(obj, (item) => stringifyObj(item));
}

function methods(client, isConnected) {
  /**
   * WORKS ON STRING
   */
  const set = async ({ key, value, expiry }) => {
    try {
      if (!isConnected) {
        return null;
      }
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

  const get = async (key) => {
    try {
      if (!isConnected) {
        return null;
      }
      const result = await client.get(key);
      return parseVal(result);
    } catch (error) {
      throw error;
    }
  };

  const del = async (key) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.del(key);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const incBy = async (key, incrementBy = 1) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.incr(key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const decrBy = async (key, decrementBy = 1) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.decrby(key, decrementBy);
    } catch (error) {
      throw error;
    }
  };

  const incrByFloat = async (key, incrementBy = 0) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.incrbyfloat(key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  /**
   * WORKS ON HASH (Object with no nesting key-value pair)
   */
  //HSET convert each value of obj to string by .toString() method
  const hSet = async ({ key, data, expiry }) => {
    try {
      if (!isConnected) {
        return null;
      }
      if (typeof data !== "object") {
        throw "Data must be an object";
      }
      return await client.hSet(key, stringifyObjValues(data), {
        EX: expiry ? expiry : defaultTTL,
      });
    } catch (error) {
      throw error;
    }
  };

  // Find particular key from hash
  const hGet = async (key, field) => {
    try {
      if (!isConnected) {
        return null;
      }
      const result = await client.hGet(key, field);
      return parseVal(result);
    } catch (error) {
      throw error;
    }
  };

  // Find all keys from hash
  const hGetAll = async (key) => {
    try {
      if (!isConnected) {
        return null;
      }
      const result = await client.hGetAll(key);
      if (Object.keys(result).length === 0) {
        return null;
      }

      return parseObj(result);
    } catch (error) {
      throw error;
    }
  };

  const hExists = async (name, key) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hExists(name, key);
    } catch (error) {
      throw error;
    }
  };

  const hDel = async (name, key) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hDel(name, key);
    } catch (error) {
      throw error;
    }
  };

  const hIncrBy = async (name, key, incrementBy = 1) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hincr(name, key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const hDecrBy = async (name, key, decrementBy = 1) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hdecrby(name, key, decrementBy);
    } catch (error) {
      throw error;
    }
  };

  const hIncrByFloat = async (name, key, incrementBy = 0) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hincrbyfloat(name, key, incrementBy);
    } catch (error) {
      throw error;
    }
  };

  const hStrlen = async (name, key) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hStrLen(name, key);
    } catch (error) {
      throw error;
    }
  };

  const hKeys = async (name) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hkeys(name);
    } catch (error) {
      throw error;
    }
  };

  const hValues = async (name) => {
    try {
      if (!isConnected) {
        return null;
      }
      return await client.hVals(name);
    } catch (error) {
      throw error;
    }
  };

  return {
    set,
    get,
    del,
    incBy,
    decrBy,
    incrByFloat,
    hSet,
    hGet,
    hGetAll,
    hExists,
    hDel,
    hIncrBy,
    hDecrBy,
    hIncrByFloat,
    hIncrBy,
    hStrlen,
    hKeys,
    hValues,
    client,
  };
}

module.exports = methods;
