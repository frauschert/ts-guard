import { Guard } from "../types";

export interface ArrayConstraints {
  minLength?: number;
  maxLength?: number;
  unique?: boolean;
}

const isArrayOf = <A>(itemGuard: Guard<A>, constraints?: ArrayConstraints): Guard<A[]> =>
  (x: unknown): x is A[] => {
    if (!Array.isArray(x)) {
      return false;
    }

    if (!x.every(itemGuard)) {
      return false;
    }

    if (constraints) {
      if (constraints.minLength !== undefined && x.length < constraints.minLength) {
        return false;
      }

      if (constraints.maxLength !== undefined && x.length > constraints.maxLength) {
        return false;
      }

      if (constraints.unique && new Set(x).size !== x.length) {
        return false;
      }
    }

    return true;
  };

export { isArrayOf };
