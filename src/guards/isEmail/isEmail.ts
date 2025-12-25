import type { Guard } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail: Guard<string> = (value: unknown): value is string => {
  return typeof value === "string" && emailRegex.test(value);
};
