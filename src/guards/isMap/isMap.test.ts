import { isMap } from "./isMap";
import { isNumber } from "../isNumber/isNumber";
import { isString } from "../isString/isString";

describe("isMapOf", () => {
  it("should validate empty map", () => {
    const isStringNumberMap = isMap(isString(), isNumber());
    expect(isStringNumberMap(new Map())).toBe(true);
  });

  it("should validate valid map", () => {
    const isStringNumberMap = isMap(isString(), isNumber());
    const map = new Map([
      ["one", 1],
      ["two", 2],
    ]);
    expect(isStringNumberMap(map)).toBe(true);
  });

  it("should reject invalid key type", () => {
    const isStringNumberMap = isMap(isString(), isNumber());
    const map = new Map([
      [1, 1], // number key instead of string
      [1, 1],
    ]);
    expect(isStringNumberMap(map)).toBe(false);
  });

  it("should reject invalid value type", () => {
    const isStringNumberMap = isMap(isString(), isNumber());
    const map = new Map([
      ["one", "one"], // string value instead of number
      ["two", "two"],
    ]);
    expect(isStringNumberMap(map)).toBe(false);
  });

  it("should reject non-Map objects", () => {
    const isStringNumberMap = isMap(isString(), isNumber());
    expect(isStringNumberMap({})).toBe(false);
    expect(isStringNumberMap(null)).toBe(false);
    expect(isStringNumberMap(undefined)).toBe(false);
    expect(isStringNumberMap([["key", 1]])).toBe(false);
  });
});
