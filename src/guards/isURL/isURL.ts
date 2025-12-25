import type { Guard } from "../types";

export const isURL: Guard<URL> = (value: unknown): value is URL => {
  return value instanceof URL;
};
