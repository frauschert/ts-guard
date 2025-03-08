import { isBoolean } from "./isBoolean";

describe("isBoolean", () => {
  test("should return true", () => {
    const value: unknown = true;
    expect(isBoolean()(value)).toBeTruthy();
  });
  test("should return false", () => {
    const value: unknown = "true";
    expect(isBoolean()(value)).toBeFalsy();
  });
});
