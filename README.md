# localBorage

A wrapper around the browser storage APIs to add some enhancements:

- Check if storage can be written to
- Work with non-string values
- Use same functions for local and session storage
- Set expiry for storage items

## Examples

```javascript
storageAvailable();
// => true

setStorageItem({
  key: "colorOptions",
  value: ["red", "green", "blue"],
  json: true,
  store: localStorage,
});
// => undefined

getStorageItem({ key: "colorOptions", json: true, store: localStorage });
// => ["red", "green", "blue"];

setStorageItemWithExpiry({
  key: "colorOptionsExpiry",
  value: ["red", "green", "blue"],
  expiry: new Date("2024-11-10T01:00:00"),
  store: localStorage,
});
// => undefined

getStorageItemWithExpiry({
  key: "colorOptionsExpiry",
  now: new Date(),
  store: localStorage,
});
// => ["red", "green", "blue"];

removeStorageItem({ key: "test" });
// => undefined
```
