import { isArray } from "./isArray";

describe("isArray", () => {
  it("should validate arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(["a", "b"])).toBe(true);
    expect(isArray([{}, {}])).toBe(true);
  });

  it("should reject non-arrays", () => {
    expect(isArray("string")).toBe(false);
    expect(isArray(42)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(() => {})).toBe(false);
    expect(isArray(Buffer.from("test"))).toBe(false);
  });
});
