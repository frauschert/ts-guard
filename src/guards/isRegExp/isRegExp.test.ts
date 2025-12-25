import { isRegExp } from "./isRegExp";

describe("isRegExp", () => {
  it("should validate RegExp instances", () => {
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(new RegExp("test"))).toBe(true);
    expect(isRegExp(new RegExp("test", "g"))).toBe(true);
  });

  it("should reject non-RegExp values", () => {
    expect(isRegExp("string")).toBe(false);
    expect(isRegExp(42)).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(() => {})).toBe(false);
  });
});
