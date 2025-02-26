import type { Guard } from "../types";

export interface NumberConstraints {
  min?: number;
  max?: number;
  integer?: boolean;
  positive?: boolean;
  negative?: boolean;
  finite?: boolean;
}

export function isNumber(constraints?: NumberConstraints): Guard<number> {
  return (value: unknown): value is number => {
    if (typeof value !== "number" || Number.isNaN(value)) {
      return false;
    }

    if (!constraints) {
      return true;
    }

    if (constraints.finite && !Number.isFinite(value)) {
      return false;
    }

    if (constraints.integer && !Number.isInteger(value)) {
      return false;
    }

    if (constraints.positive && value <= 0) {
      return false;
    }

    if (constraints.negative && value >= 0) {
      return false;
    }

    if (constraints.min !== undefined && value < constraints.min) {
      return false;
    }

    if (constraints.max !== undefined && value > constraints.max) {
      return false;
    }

    return true;
  };
}
