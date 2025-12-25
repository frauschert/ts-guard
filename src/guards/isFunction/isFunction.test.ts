import { isFunction } from "./isFunction";

describe("isFunction", () => {
  it("should validate basic functions", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function* () {})).toBe(true);
  });

  it("should reject non-functions", () => {
    expect(isFunction("string")).toBe(false);
    expect(isFunction(42)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(/regex/)).toBe(false);
  });

  it("should validate method functions", () => {
    const obj = {
      method() {},
    };
    expect(isFunction(obj.method)).toBe(true);
  });

  it("should validate constructor functions", () => {
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(Array)).toBe(true);
  });
});
