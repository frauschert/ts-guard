import { isUndefined } from "./isUndefined";

describe("isUndefined", () => {
  test("should return true", () => {
    const value: unknown = undefined;
    expect(isUndefined(value)).toBeTruthy();
  });
  test("should return false", () => {
    const value: unknown = "John Doe";
    expect(isUndefined(value)).toBeFalsy();
  });
});
