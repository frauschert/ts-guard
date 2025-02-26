import { isString } from "./isString";

describe("isString", () => {
  test("should be true for a string", () => {
    const value: unknown = "John Doe";
    const validator = isString();
    expect(validator(value)).toBeTruthy();
  });
  test("should be false for an number", () => {
    const value: unknown = 42;
    const validator = isString();
    expect(validator(value)).toBeFalsy();
  });

  it("should validate basic strings", () => {
    const validator = isString();
    expect(validator("hello")).toBe(true);
    expect(validator("")).toBe(true);
    expect(validator(123)).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator(undefined)).toBe(false);
  });

  it("should validate minLength constraint", () => {
    const validator = isString({ minLength: 3 });
    expect(validator("hello")).toBe(true);
    expect(validator("hi")).toBe(false);
    expect(validator("")).toBe(false);
  });

  it("should validate maxLength constraint", () => {
    const validator = isString({ maxLength: 5 });
    expect(validator("hello")).toBe(true);
    expect(validator("hi")).toBe(true);
    expect(validator("hello world")).toBe(false);
  });

  it("should validate pattern constraint", () => {
    const validator = isString({ pattern: /^[A-Z]+$/ });
    expect(validator("HELLO")).toBe(true);
    expect(validator("Hello")).toBe(false);
    expect(validator("123")).toBe(false);
  });

  it("should handle trim option", () => {
    const validator = isString({ trim: true, minLength: 3 });
    expect(validator("  hi  ")).toBe(false);
    expect(validator("  hello  ")).toBe(true);
  });

  it("should handle multiple constraints", () => {
    const validator = isString({
      minLength: 3,
      maxLength: 8,
      pattern: /^[A-Z]/,
      trim: true,
    });
    expect(validator("Hello")).toBe(true);
    expect(validator("  Hello  ")).toBe(true);
    expect(validator("hi")).toBe(false);
    expect(validator("hello world")).toBe(false);
    expect(validator("hello")).toBe(false); // fails pattern
  });
});
