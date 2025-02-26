import { isNumber } from "./isNumber";

describe("isNumber", () => {
  it("should validate basic numbers", () => {
    const validator = isNumber();
    expect(validator(123)).toBe(true);
    expect(validator(-123)).toBe(true);
    expect(validator(0)).toBe(true);
    expect(validator(3.14)).toBe(true);
    expect(validator(NaN)).toBe(false);
    expect(validator("123")).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator(undefined)).toBe(false);
  });

  it("should validate min constraint", () => {
    const validator = isNumber({ min: 0 });
    expect(validator(10)).toBe(true);
    expect(validator(0)).toBe(true);
    expect(validator(-1)).toBe(false);
  });

  it("should validate max constraint", () => {
    const validator = isNumber({ max: 100 });
    expect(validator(50)).toBe(true);
    expect(validator(100)).toBe(true);
    expect(validator(101)).toBe(false);
  });

  it("should validate integer constraint", () => {
    const validator = isNumber({ integer: true });
    expect(validator(42)).toBe(true);
    expect(validator(-42)).toBe(true);
    expect(validator(3.14)).toBe(false);
  });

  it("should validate positive constraint", () => {
    const validator = isNumber({ positive: true });
    expect(validator(42)).toBe(true);
    expect(validator(0)).toBe(false);
    expect(validator(-42)).toBe(false);
  });

  it("should validate negative constraint", () => {
    const validator = isNumber({ negative: true });
    expect(validator(-42)).toBe(true);
    expect(validator(0)).toBe(false);
    expect(validator(42)).toBe(false);
  });

  it("should validate finite constraint", () => {
    const validator = isNumber({ finite: true });
    expect(validator(42)).toBe(true);
    expect(validator(Infinity)).toBe(false);
    expect(validator(-Infinity)).toBe(false);
  });

  it("should handle multiple constraints", () => {
    const validator = isNumber({
      min: 0,
      max: 100,
      integer: true,
      positive: true,
    });
    expect(validator(42)).toBe(true);
    expect(validator(-1)).toBe(false);
    expect(validator(3.14)).toBe(false);
    expect(validator(101)).toBe(false);
  });
});
