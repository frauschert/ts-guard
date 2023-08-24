import { Guard, TypeOf } from "../types";
import { UnionToIntersection } from "../../types";

type Intersection<T> = T extends any[] ? UnionToIntersection<TypeOf<T[number]>> : never;

const isIntersection =
  <T extends readonly [Guard<unknown>, ...Guard<unknown>[]]>(guards: T): Guard<Intersection<T>> =>
  (x: unknown): x is Intersection<T> =>
    guards.every((guard) => guard(x));

export { isIntersection };
