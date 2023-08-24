import { Primitive } from "../../types";
import { Guard } from "../types";

const isOneOf =
  <U extends Primitive, T extends readonly [U, ...U[]]>(values: T): Guard<T[number]> =>
  (x: unknown): x is T[number] =>
    values.some((v) => v === x);

export { isOneOf };
