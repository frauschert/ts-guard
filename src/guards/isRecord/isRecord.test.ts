import { isRecord } from "./isRecord";
import { isString } from "../isString/isString";
import { isNumber } from "../isNumber/isNumber";

describe("isRecord", () => {
  describe("with string values", () => {
    const isStringRecord = isRecord(isString());

    it("should return true for valid string record", () => {
      const validRecord = {
        key1: "value1",
        key2: "value2",
      };
      expect(isStringRecord(validRecord)).toBe(true);
    });

    it("should return true for empty object", () => {
      expect(isStringRecord({})).toBe(true);
    });

    it("should return false for non-object values", () => {
      expect(isStringRecord(null)).toBe(false);
      expect(isStringRecord(undefined)).toBe(false);
      expect(isStringRecord(42)).toBe(false);
      expect(isStringRecord("string")).toBe(false);
      expect(isStringRecord([])).toBe(false);
    });

    it("should return false if any value is not a string", () => {
      const invalidRecord = {
        key1: "value1",
        key2: 42,
      };
      expect(isStringRecord(invalidRecord)).toBe(false);
    });
  });

  describe("with number values", () => {
    const isNumberRecord = isRecord(isNumber());

    it("should return true for valid number record", () => {
      const validRecord = {
        key1: 1,
        key2: 2,
      };
      expect(isNumberRecord(validRecord)).toBe(true);
    });

    it("should return false if any value is not a number", () => {
      const invalidRecord = {
        key1: 1,
        key2: "2",
      };
      expect(isNumberRecord(invalidRecord)).toBe(false);
    });
  });
});
