import type { Guard } from "../types";

export function isPromise<T = unknown>(valueGuard?: Guard<T>): Guard<Promise<T>> {
  return (value: unknown): value is Promise<T> => {
    if (!(typeof value === "object" && value !== null && 
          typeof (value as any).then === "function" &&
          typeof (value as any).catch === "function")) {
      return false;
    }

    if (!valueGuard) {
      return true;
    }

    // Check that the promise resolves to a value matching the valueGuard
    const promise = value as Promise<unknown>;
    return promise.then(
      (resolvedValue) => valueGuard(resolvedValue),
      () => false
    ) as any;
  };
}