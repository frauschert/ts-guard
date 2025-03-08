import { isPromise } from "./isPromise";
import { isNumber } from "../isNumber/isNumber";
import { isString } from "../isString/isString";

describe("isPromise", () => {
  it("should validate basic promises without value guard", () => {
    const promise = Promise.resolve(42);
    const notPromise = { then: () => {} };
    
    expect(isPromise()(promise)).toBe(true);
    expect(isPromise()(notPromise)).toBe(false);
    expect(isPromise()(null)).toBe(false);
    expect(isPromise()(undefined)).toBe(false);
    expect(isPromise()({ then: 42 })).toBe(false);
  });

  it("should validate promises with value guard", async () => {
    const numberPromise = Promise.resolve(42);
    const stringPromise = Promise.resolve("test");
    const isNumberPromise = isPromise(isNumber());
    const isStringPromise = isPromise(isString());

    await expect(isNumberPromise(numberPromise)).resolves.toBe(true);
    await expect(isNumberPromise(stringPromise)).resolves.toBe(false);
    await expect(isStringPromise(stringPromise)).resolves.toBe(true);
    await expect(isStringPromise(numberPromise)).resolves.toBe(false);
  });

  it("should handle rejected promises", async () => {
    const rejectedPromise = Promise.reject(new Error("test error"));
    const isNumberPromise = isPromise(isNumber());

    await expect(isNumberPromise(rejectedPromise)).resolves.toBe(false);
  });
});