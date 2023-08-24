import { Primitive } from "../../types";
import { Guard } from "../types";

const isLiteral =
  <T extends Primitive>(value: T): Guard<T> =>
  (x: unknown): x is T =>
    x === value;

export { isLiteral };
