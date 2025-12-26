import { memoize } from "./memoize";
import { isString } from "../guards/primitive";

describe("memoize", () => {
  let callCount: number;
  let mockGuard: jest.MockedFunction<any>;

  beforeEach(() => {
    callCount = 0;
    mockGuard = jest.fn((value: unknown) => {
      callCount++;
      return typeof value === "string";
    });
  });

  it("should cache results and avoid redundant calls", () => {
    const memoizedGuard = memoize(mockGuard);

    // First call
    expect(memoizedGuard("test")).toBe(true);
    expect(callCount).toBe(1);

    // Second call with same value
    expect(memoizedGuard("test")).toBe(true);
    expect(callCount).toBe(1); // Should not increase

    // Different value
    expect(memoizedGuard("other")).toBe(true);
    expect(callCount).toBe(2);
  });

  it("should handle different types of values", () => {
    const memoizedGuard = memoize(mockGuard);

    expect(memoizedGuard("string")).toBe(true);
    expect(memoizedGuard(42)).toBe(false);
    expect(memoizedGuard({})).toBe(false);

    // Same values should be cached
    expect(memoizedGuard("string")).toBe(true);
    expect(memoizedGuard(42)).toBe(false);
    expect(callCount).toBe(3); // Only 3 calls, not 5
  });

  it("should respect maxSize option", () => {
    const memoizedGuard = memoize(mockGuard, { maxSize: 2 });

    memoizedGuard("a");
    memoizedGuard("b");
    memoizedGuard("c"); // Should evict "a"

    // "a" should be recalculated
    memoizedGuard("a");
    expect(callCount).toBe(4); // a, b, c, a(again)
  });

  it("should use custom keyFn", () => {
    const memoizedGuard = memoize(mockGuard, {
      keyFn: (value) => `custom_${String(value)}`,
    });

    memoizedGuard("test");
    memoizedGuard("test"); // Should be cached
    expect(callCount).toBe(1);
  });

  it("should handle non-serializable values", () => {
    const circular: any = {};
    circular.self = circular;

    const memoizedGuard = memoize(mockGuard);

    expect(memoizedGuard(circular)).toBe(false);
    expect(memoizedGuard(circular)).toBe(false);
    expect(callCount).toBe(1); // Should be cached despite JSON error
  });

  it("should work with real guards", () => {
    const memoizedIsString = memoize(isString());

    expect(memoizedIsString("hello")).toBe(true);
    expect(memoizedIsString("hello")).toBe(true); // Cached
    expect(memoizedIsString(123)).toBe(false);
    expect(memoizedIsString(123)).toBe(false); // Cached
  });
});
