import { isStream } from "./isStream";

describe("isStream", () => {
  const isNodeEnv = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

  it("should validate stream instances in Node.js", () => {
    if (!isNodeEnv) {
      // In non-Node environments, always false
      const validator = isStream();
      expect(validator({})).toBe(false);
      return;
    }

    // In Node.js, test with actual streams
    const { Readable, Writable } = require("stream");
    const readable = new Readable();
    const writable = new Writable();

    const validator = isStream();
    expect(validator(readable)).toBe(true);
    expect(validator(writable)).toBe(true);
  });

  it("should reject non-stream values", () => {
    const validator = isStream();
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
