import { isDate } from "./isDate";

describe("isDate", () => {
  it("should return true for valid Date objects", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("2023-01-01"))).toBe(true);
    expect(isDate(new Date(1234567890000))).toBe(true);
    expect(isDate(new Date("2023-12-31T23:59:59"))).toBe(true);
  });

  it("should return false for invalid Date objects", () => {
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate(new Date("foo"))).toBe(false);
    expect(isDate(new Date("2023-13-45"))).toBe(false);
  });

  it("should return false for non-Date values", () => {
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate("2023-01-01")).toBe(false);
    expect(isDate(123456789)).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate({ getTime: () => 1234567890000 })).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(true)).toBe(false);
  });
});
