import type { Guard } from "../types";

export function isInstanceOf<T extends new (...args: any[]) => any>(constructor: T): Guard<InstanceType<T>> {
  return (value: unknown): value is InstanceType<T> => {
    return value instanceof constructor;
  };
}
