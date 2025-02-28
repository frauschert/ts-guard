import { Guard } from "../types";

export function isSet<T>(guard: Guard<T>): Guard<Set<T>> {
  return (value: unknown): value is Set<T> => {
    if (!(value instanceof Set)) {
      return false;
    }

    for (const item of value) {
      if (!guard(item)) {
        return false;
      }
    }

    return true;
  };
}