import {
  hello,
  isStorageAvailable,
  handleGetStorage,
  handleSetStorage,
} from "../main.js";

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

describe("hello", () => {
  it("says hello", () => {
    expect(hello()).toEqual("hello");
  });
});

describe("isStorageAvailable", () => {
  it("checks if storage is available", () => {
    expect(isStorageAvailable(localStorage)).toEqual(true);

    expect(isStorageAvailable(noLocalStorage)).toEqual(false);
  });
});

describe("handleGetStorage", () => {
  beforeAll(() => {
    handleSetStorage({
      key: "promoActive",
      value: true,
      store: localStorage,
    });

    handleSetStorage({
      key: "darkMode",
      value: true,
      json: true,
      store: localStorage,
    });

    handleSetStorage({
      key: "colorOptions",
      value: ["red", "green", "blue"],
      json: true,
      store: localStorage,
    });

    handleSetStorage({
      key: "count",
      value: 5,
      json: true,
      store: localStorage,
    });
  });

  it("returns undefined if key is not found", () => {
    expect(handleGetStorage({ key: "notSet", store: localStorage })).toEqual(
      undefined
    );
  });

  it("returns a string value when json is disabled", () => {
    expect(
      handleGetStorage({ key: "promoActive", store: localStorage })
    ).toEqual("true");
  });

  it("returns a boolean value when json is enabled", () => {
    expect(
      handleGetStorage({ key: "darkMode", json: true, store: localStorage })
    ).toEqual(true);
  });

  it("returns an array value when json is enabled", () => {
    expect(
      handleGetStorage({ key: "colorOptions", json: true, store: localStorage })
    ).toEqual(["red", "green", "blue"]);
  });

  it("returns a number value when json is enabled", () => {
    expect(
      handleGetStorage({ key: "count", json: true, store: localStorage })
    ).toEqual(5);
  });
});
