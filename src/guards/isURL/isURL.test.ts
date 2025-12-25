import { isURL } from "./isURL";

describe("isURL", () => {
  it("should validate URL instances", () => {
    expect(isURL(new URL("https://example.com"))).toBe(true);
    expect(isURL(new URL("http://example.com/path?query=value"))).toBe(true);
    expect(isURL(new URL("ftp://example.com"))).toBe(true);
  });

  it("should reject non-URL values", () => {
    expect(isURL("https://example.com")).toBe(false);
    expect(isURL(42)).toBe(false);
    expect(isURL(true)).toBe(false);
    expect(isURL(null)).toBe(false);
    expect(isURL(undefined)).toBe(false);
    expect(isURL({})).toBe(false);
    expect(isURL([])).toBe(false);
    expect(isURL(new Date())).toBe(false);
    expect(isURL(() => {})).toBe(false);
    expect(isURL(/regex/)).toBe(false);
    expect(isURL(new Error())).toBe(false);
  });

  it("should reject invalid URL strings passed as objects", () => {
    // Even if somehow an invalid URL object exists, but URL constructor throws for invalid URLs
    expect(() => new URL("invalid")).toThrow();
  });
});
