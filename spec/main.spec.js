import { hello } from "../main.js";

describe("hello", () => {
  it("says hello", () => {
    expect(hello()).toEqual("hello");
  });
});
