import { ParseSuccess, p } from "../parser";

test("parser", () => {
  const parser = p.object({
    name: p.string(),
    age: p.number(),
    role: p.isOneOf(["admin", "user"]),
  });

  const result = parser.parse({ name: "John Doe", age: 25, role: "admin" });

  expect(result.success).toBeTruthy();
});

test("optional", () => {
  const parser = p.object({
    name: p.string(),
    age: p.number(),
    role: p.isOneOf(["admin", "user"]),
    address: p.optional(p.string()),
  });

  const result = parser.parse({ name: "John Doe", age: 25, role: "admin" });

  expect(result.success).toBeTruthy();
});

test("enum", () => {
  enum Level {
    Info,
    Warning,
    Error,
  }

  const levelEnumParser = p.enum(Level);

  const result = levelEnumParser.parse(0);

  expect(result.success).toBeTruthy();
  expect((result as ParseSuccess<Level>).data).toBe(Level.Info);
});
