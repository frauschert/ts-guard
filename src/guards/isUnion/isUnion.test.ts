import { isNumber } from "../../guards";
import { isString } from "../isString/isString";
import { isUnion } from "./isUnion";

describe("isUnion", () => {
  test("should return true", () => {
    const value: unknown = "John Doe";
    const isStringOrNumber = isUnion([isString(), isNumber()]);
    expect(isStringOrNumber(value)).toBeTruthy();
  });
});
