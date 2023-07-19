// @ts-check

/**
 *
 * Checks if storage can be written to
 *
 * @func
 * @param {Object} options
 * @param {Object=} options.store storage method
 * @return {boolean}
 * @example
 *
 * storageAvailable();
 * // => true
 *
 **/
export function storageAvailable({ store = localStorage }) {
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
 * getStorageItem({ key: "colorOptions", json: true, store: localStorage })
 * // => ["red", "green", "blue"];
 *
 **/
export function getStorageItem({ key, json = false, store = localStorage }) {
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
 * Gets an item by key from storage if it has not expired
 * If the item has expired, delete from storage
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {Date=} options.now the current time
 * @param {Object=} options.store storage method
 * @return {undefined|*}
 * @example
 *
 * getStorageItemWithExpiry({
 *   key: "colorOptionsExpiry",
 *   now: new Date(),
 *   store: localStorage,
 * });
 *
 **/
function getStorageItemWithExpiry({
  key,
  now = new Date(),
  store = localStorage,
}) {
  const item = getStorageItem({ key, json: true, store });

  if (!item) {
    return;
  }

  if (now.getTime() > new Date(item.expiry).getTime()) {
    removeStorageItem({ key });
    return;
  }

  return item.value;
}

/**
 *
 * Sets an item in storage with key as name and value as value
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {*} options.value value of storage item
 * @param {boolean=} options.json value should be written as JSON
 * @param {Object=} options.store storage method
 * @return {undefined}
 * @example
 *
 * setStorageItem({
 *   key: "colorOptions",
 *   value: ["red", "green", "blue"],
 *   json: true,
 *   store: localStorage,
 * });
 * // => undefined
 *
 **/
export function setStorageItem({
  key,
  value,
  json = false,
  store = localStorage,
}) {
  if (!storageAvailable({ store: store })) {
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
 * Sets an item in storage with key as name and value as value
 * Also sets an expiry time for item
 *
 * @func
 * @param {Object} options
 * @param {String} options.key name of storage item
 * @param {*} options.value value of storage item
 * @param {Date=} options.now the current time
 * @param {Date=} options.expiry the expiry time
 * @param {Object=} options.store storage method
 * @return {undefined}
 * @example
 *
 * setStorageItemWithExpiry({
 *   key: "colorOptionsExpiry",
 *   value: ["red", "green", "blue"],
 *   expiry: new Date("2024-11-10T01:00:00"),
 *   store: localStorage,
 * });
 * // => undefined
 *
 **/
function setStorageItemWithExpiry({
  key,
  value,
  now = new Date(),
  expiry,
  store = localStorage,
}) {
  if (!expiry) {
    return;
  }

  if (now.getTime() > expiry.getTime()) {
    return;
  }

  const valueWithExpiry = {
    value,
    expiry,
  };

  setStorageItem({ key, value: valueWithExpiry, json: true, store });
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
 * removeStorageItem({key: "test"});
 * // => undefined
 *
 **/
export function removeStorageItem({ key, store = localStorage }) {
  store.removeItem(key);
}

/**
 *
 * Checks for storage clashes
 *
 * @func
 * @param {Object} options
 * @param {Array} options.keys
 * @param {Object=} options.store storage method
 * @return {boolean}
 * @example
 *
 * storageClashes(["darkMode", "colorOptions"]);
 * // => true
 *
 **/
export function storageClashes({ keys, store = localStorage }) {
  return keys.some((key) => getStorageItem({ key: key, store }));
}
