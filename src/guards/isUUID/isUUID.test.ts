import { isUUID } from "./isUUID";

describe("isUUID", () => {
  it("should validate valid UUIDs", () => {
    expect(isUUID("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(isUUID("6ba7b810-9dad-11d1-80b4-00c04fd430c8")).toBe(true);
    expect(isUUID("550E8400-E29B-41D4-A716-446655440000")).toBe(true); // uppercase
  });

  it("should reject invalid UUIDs", () => {
    expect(isUUID("123e4567-e89b-12d3-a456")).toBe(false); // too short
    expect(isUUID("123e4567-e89b-12d3-a456-426614174000-extra")).toBe(false); // too long
    expect(isUUID("123e4567-e89b-12d3-a456-42661417400g")).toBe(false); // invalid char
    expect(isUUID("123e4567e89b12d3a456426614174000")).toBe(false); // no dashes
    expect(isUUID("")).toBe(false);
    expect(isUUID("not-a-uuid")).toBe(false);
  });

  it("should reject non-string values", () => {
    expect(isUUID(42)).toBe(false);
    expect(isUUID(true)).toBe(false);
    expect(isUUID(null)).toBe(false);
    expect(isUUID(undefined)).toBe(false);
    expect(isUUID({})).toBe(false);
    expect(isUUID([])).toBe(false);
  });
});
