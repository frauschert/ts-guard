import { isBigInt } from "./isBigInt";

describe("isBigInt", () => {
  it("should validate basic bigints", () => {
    const validator = isBigInt();
    expect(validator(123n)).toBe(true);
    expect(validator(-123n)).toBe(true);
    expect(validator(0n)).toBe(true);
    expect(validator(123)).toBe(false);
    expect(validator("123")).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator(undefined)).toBe(false);
  });

  it("should validate min constraint", () => {
    const validator = isBigInt({ min: 0n });
    expect(validator(10n)).toBe(true);
    expect(validator(0n)).toBe(true);
    expect(validator(-1n)).toBe(false);
  });

  it("should validate max constraint", () => {
    const validator = isBigInt({ max: 100n });
    expect(validator(50n)).toBe(true);
    expect(validator(100n)).toBe(true);
    expect(validator(101n)).toBe(false);
  });

  it("should validate positive constraint", () => {
    const validator = isBigInt({ positive: true });
    expect(validator(42n)).toBe(true);
    expect(validator(0n)).toBe(false);
    expect(validator(-42n)).toBe(false);
  });

  it("should validate negative constraint", () => {
    const validator = isBigInt({ negative: true });
    expect(validator(-42n)).toBe(true);
    expect(validator(0n)).toBe(false);
    expect(validator(42n)).toBe(false);
  });

  it("should handle multiple constraints", () => {
    const validator = isBigInt({
      min: 0n,
      max: 100n,
      positive: true,
    });
    expect(validator(42n)).toBe(true);
    expect(validator(-1n)).toBe(false);
    expect(validator(101n)).toBe(false);
  });
});
