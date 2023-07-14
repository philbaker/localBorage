export function isStorageAvailable(store = localStorage) {
  const test = "isstorageavailabletest";

  try {
    store.setItem(test, test);
    store.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function handleGetStorage({ key, json = false, store = localStorage }) {
  if (!store.getItem(key)) {
    return;
  }

  if (json) {
    return JSON.parse(store.getItem(key));
  }

  return store.getItem(key);
}

export function handleSetStorage({
  key,
  value,
  json = false,
  store = localStorage,
}) {
  if (!isStorageAvailable(store)) {
    return;
  }

  if (json) {
    store.setItem(key, JSON.stringify(value));
    return;
  }

  store.setItem(key, value);
}

function handleRemoveStorage({ key, store = localStorage }) {
  store.removeItem(key);
}

function handleClashes(clashes) {
  let clashMatches = clashes.some((clash) => {
    return handleGetStorage({ key: clash, store });
  });

  return clashMatches;
}
