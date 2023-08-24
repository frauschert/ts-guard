import { isNumber } from "./isNumber";

describe("isNumber", () => {
  test("should be true for an number", () => {
    const value: unknown = 42;
    expect(isNumber(value)).toBeTruthy();
  });
  test("should be false for a string", () => {
    const value: unknown = "John Doe";
    expect(isNumber(value)).toBeFalsy();
  });
});
