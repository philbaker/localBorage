import { storageAvailable, getStorage, setStorage } from "../main.js";

// Features
// - [x] Check to see if storage can be set before proceeding
// - [x] Swappable storage methods (localStorage, sessionStorage)
// - [ ] Create, read, update and delete
// - [ ] Clash detection (set a flag if another value is present - e.g. stop two
// modals appearing at same time)
// - [ ] Storage expiration

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
    expect(storageAvailable(localStorage)).toEqual(true);

    expect(storageAvailable(noLocalStorage)).toEqual(false);
  });
});

describe("getStorage", () => {
  beforeAll(() => {
    setStorage({
      key: "promoActive",
      value: true,
      store: localStorage,
    });

    setStorage({
      key: "darkMode",
      value: true,
      json: true,
      store: localStorage,
    });

    setStorage({
      key: "colorOptions",
      value: ["red", "green", "blue"],
      json: true,
      store: localStorage,
    });

    setStorage({
      key: "count",
      value: 5,
      json: true,
      store: localStorage,
    });
  });

  it("returns undefined if key is not found", () => {
    expect(getStorage({ key: "notSet", store: localStorage })).toEqual(
      undefined
    );
  });

  it("returns a string value when json is disabled", () => {
    expect(getStorage({ key: "promoActive", store: localStorage })).toEqual(
      "true"
    );
  });

  it("returns a boolean value when json is enabled", () => {
    expect(
      getStorage({ key: "darkMode", json: true, store: localStorage })
    ).toEqual(true);
  });

  it("returns an array value when json is enabled", () => {
    expect(
      getStorage({ key: "colorOptions", json: true, store: localStorage })
    ).toEqual(["red", "green", "blue"]);
  });

  it("returns a number value when json is enabled", () => {
    expect(
      getStorage({ key: "count", json: true, store: localStorage })
    ).toEqual(5);
  });
});
