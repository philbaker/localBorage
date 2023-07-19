import {
  storageAvailable,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../main.js";

// Tests
// - [x] storageAvailable
// - [x] getStorageItem
// - [x] removeStorageItem
// - [ ] setStorageItem
// - [ ] setStorageItemWithExpiry
// - [ ] getStorageItemWithExpiry
//    - Note: pass in now and expiry in order to test

// Features
// - [x] Check to see if storage can be set before proceeding
// - [x] Swappable storage methods (localStorage, sessionStorage)
// - [x] Create, read, update and delete
// - [x] Storage expiration

// Local storage mock
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

const localStorage = new LocalStorageMock();
const noLocalStorage = null;

describe("storageAvailable", () => {
  it("checks if storage is available", () => {
    expect(storageAvailable({ store: localStorage })).toEqual(true);

    expect(storageAvailable({ store: noLocalStorage })).toEqual(false);
  });
});

describe("getStorageItem", () => {
  beforeAll(() => {
    setStorageItem({
      key: "promoActive",
      value: true,
      store: localStorage,
    });

    setStorageItem({
      key: "darkMode",
      value: true,
      json: true,
      store: localStorage,
    });

    setStorageItem({
      key: "colorOptions",
      value: ["red", "green", "blue"],
      json: true,
      store: localStorage,
    });

    setStorageItem({
      key: "count",
      value: 5,
      json: true,
      store: localStorage,
    });
  });

  it("returns undefined if key is not found", () => {
    expect(getStorageItem({ key: "notSet", store: localStorage })).toEqual(
      undefined
    );
  });

  it("returns a string value when json is disabled", () => {
    expect(getStorageItem({ key: "promoActive", store: localStorage })).toEqual(
      "true"
    );
  });

  it("returns a boolean value when json is enabled", () => {
    expect(
      getStorageItem({ key: "darkMode", json: true, store: localStorage })
    ).toEqual(true);
  });

  it("returns an array value when json is enabled", () => {
    expect(
      getStorageItem({ key: "colorOptions", json: true, store: localStorage })
    ).toEqual(["red", "green", "blue"]);
  });

  it("returns a number value when json is enabled", () => {
    expect(
      getStorageItem({ key: "count", json: true, store: localStorage })
    ).toEqual(5);
  });
});

describe("removeStorageItem", () => {
  beforeAll(() => {
    setStorageItem({
      key: "promoActive",
      value: true,
      store: localStorage,
    });
  });

  it("removes an item from storage if key exists", () => {
    removeStorageItem({ key: "promoActive", store: localStorage });

    expect(getStorageItem({ key: "promoActive", store: localStorage })).toEqual(
      undefined
    );
  });
});
