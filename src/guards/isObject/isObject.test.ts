import { isObject } from "..";
import { isString } from "../isString/isString";
import { isNumber } from "../isNumber/isNumber";

describe("isObject", () => {
  it("should validate a simple object", () => {
    const guard = isObject({
      name: isString(),
      age: isNumber(),
    });

    expect(guard({ name: "John", age: 30 })).toBe(true);
    expect(guard({ name: "John", age: "30" })).toBe(false);
    expect(guard({ name: 42, age: 30 })).toBe(false);
  });

  it("should handle null and undefined", () => {
    const guard = isObject({
      name: isString(),
    });

    expect(guard(null)).toBe(false);
    expect(guard(undefined)).toBe(false);
  });

  it("should validate nested objects", () => {
    const addressGuard = isObject({
      street: isString(),
      number: isNumber(),
    });

    const personGuard = isObject({
      name: isString(),
      address: addressGuard,
    });

    expect(
      personGuard({
        name: "John",
        address: { street: "Main St", number: 123 },
      }),
    ).toBe(true);

    expect(
      personGuard({
        name: "John",
        address: { street: "Main St", number: "123" },
      }),
    ).toBe(false);
  });

  it("should fail for objects with missing properties", () => {
    const guard = isObject({
      name: isString(),
      age: isNumber(),
    });

    expect(guard({ name: "John" })).toBe(false);
    expect(guard({ age: 30 })).toBe(false);
  });

  it("should fail for non-object values", () => {
    const guard = isObject({
      name: isString(),
    });

    expect(guard("not an object")).toBe(false);
    expect(guard(42)).toBe(false);
    expect(guard(true)).toBe(false);
    expect(guard([])).toBe(false);
  });
});
