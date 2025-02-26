import { isInstanceOf } from "./isInstanceOf";

class TestClass {
  constructor(public value: string) {}
}

class AnotherClass {
  constructor(public num: number) {}
}

describe("isInstanceOf", () => {
  it("should return true for matching instances", () => {
    const isTestClass = isInstanceOf(TestClass);
    expect(isTestClass(new TestClass("test"))).toBe(true);
  });

  it("should return false for non-matching instances", () => {
    const isTestClass = isInstanceOf(TestClass);
    expect(isTestClass(new AnotherClass(42))).toBe(false);
    expect(isTestClass({})).toBe(false);
    expect(isTestClass(null)).toBe(false);
    expect(isTestClass(undefined)).toBe(false);
  });

  it("should work with built-in classes", () => {
    const isRegExp = isInstanceOf(RegExp);
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(new RegExp("test"))).toBe(true);
    expect(isRegExp({})).toBe(false);
  });
});
