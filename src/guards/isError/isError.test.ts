import { isError } from "./isError";

describe("isError", () => {
  it("should validate Error instances", () => {
    expect(isError(new Error("test"))).toBe(true);
    expect(isError(new TypeError("test"))).toBe(true);
    expect(isError(new RangeError("test"))).toBe(true);
    expect(isError(new SyntaxError("test"))).toBe(true);
    expect(isError(new ReferenceError("test"))).toBe(true);
  });

  it("should reject non-Error values", () => {
    expect(isError("string")).toBe(false);
    expect(isError(42)).toBe(false);
    expect(isError(true)).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
    expect(isError({})).toBe(false);
    expect(isError([])).toBe(false);
    expect(isError(new Date())).toBe(false);
    expect(isError(() => {})).toBe(false);
    expect(isError(/regex/)).toBe(false);
  });
});
