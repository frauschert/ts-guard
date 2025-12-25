import type { Guard } from "../types";

export const isError: Guard<Error> = (value: unknown): value is Error => {
  return value instanceof Error;
};
