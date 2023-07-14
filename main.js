class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

var localStorage = new LocalStorageMock();

function isStorageAvailable(store = localStorage) {
  const test = "isstorageavailabletest";

  try {
    store.setItem(test, test);
    store.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function handleGetStorage({ name, store = localStorage, json = true }) {
  if (!store.getItem(name)) {
    return;
  }

  if (json) {
    return JSON.parse(store.getItem(name));
  }

  store.getItem(name);
}

function handleSetStorage({
  name,
  value,
  clashes = null,
  json = true,
  store = localStorage,
}) {
  if (!isStorageAvailable(store)) {
    return;
  }

  if (clashes) {
    let clashMatches = clashes.some((clash) => {
      return handleGetStorage({ name: clash, store });
    });

    if (clashMatches) {
      return;
    }
  }

  if (json) {
    store.setItem(name, JSON.stringify(value));
    return;
  }

  store.setItem(name, value);
}

function handleRemoveStorage({ name, store = localStorage }) {
  store.removeItem(name);
}

export function hello() {
  return "hello";
}
