import type { Guard } from "../types";

export const isFunction: Guard<Function> = (value: unknown): value is Function => {
  return typeof value === "function";
};
