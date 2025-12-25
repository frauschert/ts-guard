import { isEventEmitter } from "./isEventEmitter";

describe("isEventEmitter", () => {
  const isNodeEnv = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

  it("should validate EventEmitter instances in Node.js", () => {
    if (!isNodeEnv) {
      const validator = isEventEmitter();
      expect(validator({})).toBe(false);
      return;
    }

    const { EventEmitter } = require("events");
    const emitter = new EventEmitter();

    const validator = isEventEmitter();
    expect(validator(emitter)).toBe(true);
  });

  it("should reject non-EventEmitter values", () => {
    const validator = isEventEmitter();
    expect(validator("string")).toBe(false);
    expect(validator(42)).toBe(false);
    expect(validator(true)).toBe(false);
    expect(validator(null)).toBe(false);
    expect(validator(undefined)).toBe(false);
    expect(validator({})).toBe(false);
    expect(validator([])).toBe(false);
    expect(validator(new Date())).toBe(false);
    expect(validator(Buffer.from("test"))).toBe(false);
  });
});
