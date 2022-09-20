const set = (name: string, value: string) => {
  if (typeof window?.localStorage === "undefined") return false;
  window.localStorage.setItem(name, value);
};

const get = (itemName: string) => {
  if (typeof window?.localStorage === "undefined") return false;
  return window.localStorage.getItem(itemName);
};

const remove = (itemName: string) => {
  if (typeof window?.localStorage === "undefined") return false;
  return window.localStorage.removeItem(itemName);
};

export const localStorageManager = {
  set,
  get,
  remove,
};
