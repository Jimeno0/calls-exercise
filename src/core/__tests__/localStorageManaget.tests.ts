import { localStorageManager } from "../localStorageManager";

type Store = {
  [key: string]: string;
};

const localStorageMock = (() => {
  let store: Store = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

describe("Local Stogare manager", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("returns item value from localStorage", () => {
    const getItemSpy = jest.spyOn(window.localStorage, "getItem");
    localStorageManager.set("testLocalStorage", "something");
    const actualValue = localStorageManager.get("testLocalStorage");
    expect(actualValue).toEqual("something");
    expect(getItemSpy).toBeCalledWith("testLocalStorage");
    window.localStorage.clear();
  });
  test("returns null if key does not exist in localStorage", () => {
    const getItemSpy = jest.spyOn(window.localStorage, "getItem");
    const actualValue = localStorageManager.get("testLocalStorage");
    expect(actualValue).toEqual(null);
    expect(getItemSpy).toBeCalledWith("testLocalStorage");
    window.localStorage.clear();
  });
  test("returns false if window.localStorage does not exist", () => {
    Object.defineProperty(window, "localStorage", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const actualValue = localStorageManager.get("testLocalStorage");
    expect(actualValue).toEqual(false);
  });
  test("returns false if set on localStorage does not exist", () => {
    Object.defineProperty(window, "localStorage", {
      value: undefined,
      writable: true,
      configurable: true,
    });
    const fallbackValue = localStorageManager.set(
      "testLocalStorage",
      "something"
    );
    expect(fallbackValue).toEqual(false);
  });
});
