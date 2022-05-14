import LZUTF8 from "lzutf8";
import { configuration } from "./configuration";

/**
 * compress data within a deadline (timeout) already configured on configuration
 * @param {string} data data represented by a string
 */
const compress = function (data) {
  return new Promise(function (resolve) {
    let isTimeout = false;
    const timeout = setTimeout(() => {
      isTimeout = true;
      resolve(data);
    }, configuration.compressionTimeoutDelay);
    const compressed = LZUTF8.compress(data, { outputEncoding: "Base64", inputEncoding: "String" });
    if (isTimeout) {
      return;
    }

    clearTimeout(timeout);
    resolve(compressed);
  });
};

/**
 * Write an object inside localstorage
 * @param {string} key Property key to identify the object on localstorage
 * @param {any} obj Object to save can be an object, array, string etc...
 * @example
 * ```js
 * writeObject("players", ["Ronaldo", "Messi"])
 * ```
 */
const writeObject = async function (key, obj) {
  const stringified = await compress(JSON.stringify(obj));
  try {
    window.localStorage.setItem(key, stringified);
  } catch {
    const { size } = new Blob([stringified]);
    for (let index = 0; index < window.localStorage.length; ++index) {
      const key = window.localStorage.key(index);
      const ignore = configuration.protectedFromCleaning.some(function (pattern) {
        if (typeof pattern === "string" && key === pattern) {
          return true;
        }

        if (pattern instanceof RegExp && pattern.test(key)) {
          return true;
        }

        return false;
      });
      if (ignore) {
        continue;
      }

      if (new Blob([window.localStorage.getItem(key)]).size >= size) {
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, stringified);
        break;
      }
    }
  }
};

/**
 * Check if the key exist on the localstorage
 * @param {string} key Key name
 * @returns key exist or not
 */
const hasKey = function (key) {
  return window.localStorage.getItem(key) !== null;
};

/**
 * Read a property from localstorage within a key to identify the element
 * @param {string} key
 * @returns Key's object (data)
 * @example
 * ```js
 * readObject("players") // will return ["Ronaldo", "Messi"]
 * ```
 */
const readObject = function (key) {
  if (!hasKey(key)) {
    return void 0;
  }

  const item = window.localStorage.getItem(key);
  try {
    // if the saved data is not compressed so it should be JSON format
    return JSON.parse(item);
  } catch {
    // it seems to be a compressed data
    try {
      return JSON.parse(LZUTF8.decompress(item, { outputEncoding: "String", inputEncoding: "Base64" }));
    } catch {
      return item;
    }
  }
};

const Cache = { hasKey, writeObject, readObject };
export default Cache;
