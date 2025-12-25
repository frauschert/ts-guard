import type { Guard } from "../types";

export const isArray: Guard<unknown[]> = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};
