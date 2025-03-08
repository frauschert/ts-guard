import { Guard } from "../types";

export function isBoolean(): Guard<boolean> {
  return (x: unknown): x is boolean => typeof x === "boolean";
}
