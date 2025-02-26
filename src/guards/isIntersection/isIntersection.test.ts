import { isIntersection } from "./isIntersection";
import { isObject } from "../isObject";
import { isString } from "../isString";
import { isNumber } from "../isNumber";

describe("isIntersection", () => {
  test("should return true", () => {
    const isPerson = isObject({ name: isString(), age: isNumber() });
    const isAddress = isObject({ address: isString() });
    const isPersonAndAddress = isIntersection([isPerson, isAddress]);
    const value: unknown = { name: "John Doe", age: 42, address: "Some street 1" };
    expect(isPersonAndAddress(value)).toBeTruthy();
  });
  test("should return false", () => {
    const isPerson = isObject({ name: isString(), age: isNumber() });
    const isAddress = isObject({ address: isString() });
    const isPersonAndAddress = isIntersection([isPerson, isAddress]);
    const value: unknown = { name: "John Doe", age: 42 };
    expect(isPersonAndAddress(value)).toBeFalsy();
  });
  test("should return false for invalid age type", () => {
    const isPerson = isObject({ name: isString(), age: isNumber() });
    const isAddress = isObject({ address: isString() });
    const isPersonAndAddress = isIntersection([isPerson, isAddress]);
    const value: unknown = { name: "John Doe", age: "not a number", address: "Some street 1" };
    expect(isPersonAndAddress(value)).toBeFalsy();
  });
});
