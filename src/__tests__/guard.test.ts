import { isArrayOf, isNumber, isString, isObject, isOneOf } from "../guards";

test("isArrayOf", () => {
  const isStringArray = isArrayOf(isString);
  expect(isStringArray(["This", "is", "just", "a", "test"])).toBeTruthy();
  expect(isStringArray(["This", "is", 1, "other", "test"])).toBeFalsy();
});

test("isObject", () => {
  const typeGuard = isObject({ name: isString, age: isNumber });
  expect(typeGuard({ name: "John", age: 42 })).toBeTruthy();
  expect(typeGuard({ age: 42 })).toBeFalsy();
});

test("isOneOf", () => {
  const isAOrBOrC = isOneOf(["A", "B", "C"]);
  expect(isAOrBOrC("A")).toBeTruthy();
  expect(isAOrBOrC("B")).toBeTruthy();
  expect(isAOrBOrC("C")).toBeTruthy();
  expect(isAOrBOrC("D")).toBeFalsy();
});
