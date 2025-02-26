import { isArrayOf } from "./isArrayOf";
import { isString } from "../isString/isString";

describe("isArrayOf", () => {
  test("should return true when passed an array of strings", () => {
    const value: unknown = ["John", "Doe"];
    const isArrayOfString = isArrayOf(isString());
    expect(isArrayOfString(value)).toBeTruthy();
  });
});
