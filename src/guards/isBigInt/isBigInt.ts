import type { Guard } from "../types";

export interface BigIntConstraints {
  min?: bigint;
  max?: bigint;
  positive?: boolean;
  negative?: boolean;
}

export function isBigInt(constraints?: BigIntConstraints): Guard<bigint> {
  return (value: unknown): value is bigint => {
    if (typeof value !== "bigint") {
      return false;
    }

    if (!constraints) {
      return true;
    }

    if (constraints.positive && value <= 0n) {
      return false;
    }

    if (constraints.negative && value >= 0n) {
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
