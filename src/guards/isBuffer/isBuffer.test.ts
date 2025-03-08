import { isBuffer } from "./isBuffer";

describe("isBuffer", () => {
  describe("in Node environment", () => {
    const originalProcess = global.process;

    beforeAll(() => {
      // Ensure Node.js environment
      (global as any).process = {
        versions: { node: "16.0.0" }
      };
    });

    afterAll(() => {
      // Restore original process
      (global as any).process = originalProcess;
    });

    it("should validate Buffer objects", () => {
      expect(isBuffer()(Buffer.from("test"))).toBe(true);
      expect(isBuffer()(Buffer.alloc(10))).toBe(true);
      expect(isBuffer()(Buffer.from([1, 2, 3]))).toBe(true);
    });

    it("should return false for non-Buffer values", () => {
      expect(isBuffer()(new Uint8Array([1, 2, 3]))).toBe(false);
      expect(isBuffer()("buffer")).toBe(false);
      expect(isBuffer()(42)).toBe(false);
      expect(isBuffer()(null)).toBe(false);
      expect(isBuffer()(undefined)).toBe(false);
      expect(isBuffer()({})).toBe(false);
      expect(isBuffer()([])).toBe(false);
    });
  });

  describe("in browser environment", () => {
    const originalProcess = global.process;

    beforeAll(() => {
      // Mock browser environment by removing process
      delete (global as any).process;
    });

    afterAll(() => {
      // Restore Node environment
      (global as any).process = originalProcess;
    });

    it("should always return false", () => {
      expect(isBuffer()(new Uint8Array([1, 2, 3]))).toBe(false);
      expect(isBuffer()("buffer")).toBe(false);
      expect(isBuffer()({})).toBe(false);
      expect(isBuffer()(null)).toBe(false);
    });
  });
});