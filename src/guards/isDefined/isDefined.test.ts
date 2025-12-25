import { isDefined } from "./isDefined";

describe("isDefined", () => {
  it("should validate defined values", () => {
    expect(isDefined("string")).toBe(true);
    expect(isDefined(42)).toBe(true);
    expect(isDefined(true)).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
    expect(isDefined(() => {})).toBe(true);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined("")).toBe(true);
  });

  it("should reject null and undefined", () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});
