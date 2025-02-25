import type { Guard } from "../types";

export const isDate: Guard<Date> = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};
