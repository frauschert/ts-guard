import { isString } from "../isString";
import { isOptional } from "./isOptional";

describe("isOneOf", () => {
  test("should return true", () => {
    const isStringOrUndefined = isOptional(isString());
    const value = undefined;
    expect(isStringOrUndefined(value)).toBeTruthy();
  });
});
