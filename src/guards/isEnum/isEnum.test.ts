import { isEnum } from "./isEnum";

describe("isEnum", () => {
  test("should return true", () => {
    enum Level {
      Info,
      Warning,
      Error,
    }

    const isLevelEnum = isEnum(Level);
    expect(isLevelEnum(0)).toBeTruthy();
  });
});
