import { isLiteral } from "./isLiteral";

describe("isLiteral", () => {
  test("should return true", () => {
    const isA = isLiteral("A");
    const value = "A";
    expect(isA(value)).toBeTruthy();
  });
});
