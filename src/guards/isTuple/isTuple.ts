import type { Guard, TypeOf } from "../types";

export function isTuple<T extends readonly [Guard<unknown>, ...Guard<unknown>[]]>(guards: T): Guard<{ [K in keyof T]: TypeOf<T[K]> }> {
  return (value: unknown): value is { [K in keyof T]: TypeOf<T[K]> } => {
    if (!Array.isArray(value)) {
      return false;
    }

    if (value.length !== guards.length) {
      return false;
    }

    return guards.every((guard, index) => guard(value[index]));
  };
}