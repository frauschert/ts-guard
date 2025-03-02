import { isArrayOf } from "./isArrayOf";
import { isString } from "../isString/isString";
import { isNumber } from "../isNumber/isNumber";

describe("isArrayOf", () => {
  test("should return true when passed an array of strings", () => {
    const value: unknown = ["John", "Doe"];
    const isArrayOfString = isArrayOf(isString());
    expect(isArrayOfString(value)).toBeTruthy();
  });

  describe("with constraints", () => {
    it("should validate minLength constraint", () => {
      const guard = isArrayOf(isString(), { minLength: 2 });
      expect(guard(["a", "b"])).toBe(true);
      expect(guard(["a"])).toBe(false);
      expect(guard([])).toBe(false);
    });

    it("should validate maxLength constraint", () => {
      const guard = isArrayOf(isNumber(), { maxLength: 3 });
      expect(guard([1, 2, 3])).toBe(true);
      expect(guard([1, 2, 3, 4])).toBe(false);
    });

    it("should validate unique constraint", () => {
      const guard = isArrayOf(isNumber(), { unique: true });
      expect(guard([1, 2, 3])).toBe(true);
      expect(guard([1, 2, 2])).toBe(false);
    });

    it("should validate multiple constraints", () => {
      const guard = isArrayOf(isString(), {
        minLength: 2,
        maxLength: 4,
        unique: true,
      });
      expect(guard(["a", "b", "c"])).toBe(true);
      expect(guard(["a"])).toBe(false);
      expect(guard(["a", "b", "c", "d", "e"])).toBe(false);
      expect(guard(["a", "b", "b"])).toBe(false);
    });
  });
});
