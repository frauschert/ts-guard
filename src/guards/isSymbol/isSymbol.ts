import type { Guard } from "../types";

export function isSymbol(): Guard<symbol> {
  return (value: unknown): value is symbol => typeof value === "symbol";
}