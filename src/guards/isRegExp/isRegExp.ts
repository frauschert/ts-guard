import type { Guard } from "../types";

export const isRegExp: Guard<RegExp> = (value: unknown): value is RegExp => {
  return value instanceof RegExp;
};
