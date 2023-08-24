import { isString } from "./isString";

describe("isString", () => {
  test("should be true for a string", () => {
    const value: unknown = "John Doe";
    expect(isString(value)).toBeTruthy();
  });
  test("should be false for an number", () => {
    const value: unknown = 42;
    expect(isString(value)).toBeFalsy();
  });
});
