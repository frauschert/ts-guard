import { p } from "../parser";

test("parser", () => {
  const parser = p.object({
    name: p.string(),
    age: p.number(),
    role: p.isOneOf(["admin", "user"]),
  });

  const result = parser.parse({ name: "John Doe", age: 25, role: "admin" });

  expect(result.success).toBeTruthy();
});
