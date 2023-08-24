import { isArrayOf } from "./isArrayOf";
import { isString } from "../isString";

describe("isArrayOf", () => {
  test("should return true", () => {
    const value: unknown = ["John", "Doe"];
    const isArrayOfString = isArrayOf(isString);
    expect(isArrayOfString(value)).toBeTruthy();
  });
});
