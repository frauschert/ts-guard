import type { Guard } from "../types";

export interface StringConstraints {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  trim?: boolean;
}

export function isString(constraints?: StringConstraints): Guard<string> {
  return (value: unknown): value is string => {
    if (typeof value !== "string") {
      return false;
    }

    if (!constraints) {
      return true;
    }

    const stringToTest = constraints.trim ? value.trim() : value;

    if (constraints.minLength !== undefined && stringToTest.length < constraints.minLength) {
      return false;
    }

    if (constraints.maxLength !== undefined && stringToTest.length > constraints.maxLength) {
      return false;
    }

    if (constraints.pattern && !constraints.pattern.test(stringToTest)) {
      return false;
    }

    return true;
  };
}
