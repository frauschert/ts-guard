import { isEmail } from "./isEmail";

describe("isEmail", () => {
  it("should validate valid email addresses", () => {
    expect(isEmail("user@example.com")).toBe(true);
    expect(isEmail("test.email+tag@domain.co.uk")).toBe(true);
    expect(isEmail("user_name@sub.domain.org")).toBe(true);
  });

  it("should reject invalid email addresses", () => {
    expect(isEmail("invalid")).toBe(false);
    expect(isEmail("user@")).toBe(false);
    expect(isEmail("@domain.com")).toBe(false);
    expect(isEmail("user@domain")).toBe(false);
    expect(isEmail("user domain.com")).toBe(false);
    expect(isEmail("user@domain.")).toBe(false);
    expect(isEmail("")).toBe(false);
  });

  it("should reject non-string values", () => {
    expect(isEmail(42)).toBe(false);
    expect(isEmail(true)).toBe(false);
    expect(isEmail(null)).toBe(false);
    expect(isEmail(undefined)).toBe(false);
    expect(isEmail({})).toBe(false);
    expect(isEmail([])).toBe(false);
    expect(isEmail(new Date())).toBe(false);
    expect(isEmail(() => {})).toBe(false);
  });
});
