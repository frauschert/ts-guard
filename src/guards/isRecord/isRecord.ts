import type { Guard } from "../types";

export function isRecord<T>(value: Guard<T>): Guard<Record<string, T>> {
  return (x: unknown): x is Record<string, T> => {
    return typeof x === "object" && x !== null && Object.values(x).every(value);
  };
}