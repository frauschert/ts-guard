import { isTuple } from "./isTuple";
import { isString } from "../isString/isString";
import { isNumber } from "../isNumber/isNumber";
import { isBoolean } from "../isBoolean/isBoolean";

describe("isTuple", () => {
  it("should validate basic tuples", () => {
    const isPersonTuple = isTuple([isString(), isNumber()]);
    expect(isPersonTuple(["John", 30])).toBe(true);
    expect(isPersonTuple(["John", "30"])).toBe(false);
    expect(isPersonTuple([42, 30])).toBe(false);
  });

  it("should handle tuples of different lengths", () => {
    const isPersonWithFlagTuple = isTuple([isString(), isNumber(), isBoolean()]);
    expect(isPersonWithFlagTuple(["John", 30, true])).toBe(true);
    expect(isPersonWithFlagTuple(["John", 30])).toBe(false);
    expect(isPersonWithFlagTuple(["John", 30, true, "extra"])).toBe(false);
  });

  it("should return false for non-arrays", () => {
    const isTwoElementTuple = isTuple([isString(), isNumber()]);
    expect(isTwoElementTuple(null)).toBe(false);
    expect(isTwoElementTuple(undefined)).toBe(false);
    expect(isTwoElementTuple({})).toBe(false);
    expect(isTwoElementTuple("not an array")).toBe(false);
  });
});