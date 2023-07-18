// @ts-check

/**
 *
 * Checks if storage can be written to
 *
 * @func
 * @param {Object=} store storage method
 * @return {boolean}
 * @example
 *
 * storageAvailable();
 * // => true
 *
 **/
export function storageAvailable(store = localStorage) {
  const test = "storagetest";

  try {
    store.setItem(test, test);
    store.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *
 * Gets an item by key from storage
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {boolean=} options.json value should be read as JSON
 * @param {Object=} options.store storage method
 * @return {undefined|*}
 * @example
 *
 * getStorage({ key: "colorOptions", json: true, store: localStorage })
 * // => ["red", "green", "blue"];
 *
 **/
export function getStorage({ key, json = false, store = localStorage }) {
  if (!store.getItem(key)) {
    return;
  }

  if (json) {
    return JSON.parse(store.getItem(key));
  }

  return store.getItem(key);
}

/**
 *
 * Sets an item in storage with key as name and value as value
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {String} options.value value of storage item
 * @param {boolean=} options.json value should be written as JSON
 * @param {Object=} options.store storage method
 * @return {undefined}
 * @example
 *
 * setStorage({
 *   key: "colorOptions",
 *   value: ["red", "green", "blue"],
 *   json: true,
 *   store: localStorage,
 * });
 * // => undefined
 *
 **/
export function setStorage({ key, value, json = false, store = localStorage }) {
  if (!storageAvailable(store)) {
    return;
  }

  if (json) {
    store.setItem(key, JSON.stringify(value));
    return;
  }

  store.setItem(key, value);
}

/**
 *
 * Removes an item from storage
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {Object=} options.store storage method
 * @return {undefined}
 * @example
 *
 * removeStorage({key: "test"});
 * // => undefined
 *
 **/
function removeStorage({ key, store = localStorage }) {
  store.removeItem(key);
}

/**
 *
 * Checks for storage clashes
 *
 * @func
 * @param {Array} clashes
 * @param {Object=} store storage method
 * @return {boolean}
 * @example
 *
 * getClashes(["darkMode", "colorOptions"]);
 * // => true
 *
 **/
function getClashes(clashes, store = localStorage) {
  let clashMatches = clashes.some((clash) => {
    return getStorage({ key: clash, store });
  });

  return clashMatches;
}
