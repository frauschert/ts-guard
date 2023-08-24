import { isOneOf } from "./isOneOf";

describe("isOneOf", () => {
  test("should return true", () => {
    const isAOr12OrFalse = isOneOf(["A", 12, false]);
    const value = "A";
    expect(isAOr12OrFalse(value)).toBeTruthy();
  });
  test("should return false", () => {
    const isAOr12OrFalse = isOneOf(["A", 12, false]);
    const value = "B";
    expect(isAOr12OrFalse(value)).toBeFalsy();
  });
});
