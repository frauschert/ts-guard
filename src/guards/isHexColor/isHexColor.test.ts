import { isHexColor } from "./isHexColor";

describe("isHexColor", () => {
  it("should validate valid hex colors", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("#ffffff")).toBe(true);
    expect(isHexColor("#aabbcc")).toBe(true);
    expect(isHexColor("#123456")).toBe(true);
    expect(isHexColor("#ABCDEF")).toBe(true);
    expect(isHexColor("#aabbccdd")).toBe(true); // with alpha
  });

  it("should reject invalid hex colors", () => {
    expect(isHexColor("#ggg")).toBe(false); // invalid chars
    expect(isHexColor("#ff")).toBe(false); // too short
    expect(isHexColor("#fffffff")).toBe(false); // too long
    expect(isHexColor("#12345")).toBe(false); // 5 chars
    expect(isHexColor("#1234567")).toBe(false); // 7 chars
    expect(isHexColor("fff")).toBe(false); // no #
    expect(isHexColor("#")).toBe(false); // just #
    expect(isHexColor("")).toBe(false);
  });

  it("should reject non-string values", () => {
    expect(isHexColor(42)).toBe(false);
    expect(isHexColor(true)).toBe(false);
    expect(isHexColor(null)).toBe(false);
    expect(isHexColor(undefined)).toBe(false);
    expect(isHexColor({})).toBe(false);
    expect(isHexColor([])).toBe(false);
  });
});
