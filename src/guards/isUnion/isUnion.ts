import { Guard, TypeOf } from "../types";

const isUnion =
  <T extends readonly [Guard<unknown>, ...Guard<unknown>[]]>(guards: T): Guard<TypeOf<T[number]>> =>
  (x: unknown): x is TypeOf<T[number]> =>
    guards.some((guard) => guard(x));

export { isUnion };
