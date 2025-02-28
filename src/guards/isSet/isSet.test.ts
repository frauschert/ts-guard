import { isSet } from "./isSet";
import { isNumber } from "../isNumber/isNumber";
import { isString } from "../isString/isString";

describe("isSet", () => {
  it("should validate empty set", () => {
    const isNumberSet = isSet(isNumber());
    expect(isNumberSet(new Set())).toBe(true);
  });

  it("should validate set with valid values", () => {
    const isNumberSet = isSet(isNumber());
    const set = new Set([1, 2, 3, 4, 5]);
    expect(isNumberSet(set)).toBe(true);
  });

  it("should reject set with invalid values", () => {
    const isNumberSet = isSet(isNumber());
    const set = new Set([1, "2", 3]); // Mixed types
    expect(isNumberSet(set)).toBe(false);
  });

  it("should work with string sets", () => {
    const isStringSet = isSet(isString());
    const set = new Set(["a", "b", "c"]);
    expect(isStringSet(set)).toBe(true);
  });

  it("should reject non-Set objects", () => {
    const isNumberSet = isSet(isNumber());
    expect(isNumberSet({})).toBe(false);
    expect(isNumberSet(null)).toBe(false);
    expect(isNumberSet(undefined)).toBe(false);
    expect(isNumberSet([1, 2, 3])).toBe(false);
  });
});
