import { isNull } from "../isNull";
import { Guard } from "../types";

type PropertyGuards<A extends Record<string, unknown>> = {
  [K in keyof A]: Guard<A[K]>;
};

const isObject =
  <T extends Record<string, unknown>>(propertyGuards: PropertyGuards<T>): Guard<T> =>
  (x: unknown): x is T =>
    typeof x == "object" &&
    !isNull(x) &&
    Object.entries(propertyGuards).every(([key, value]) => value((x as any)[key]));

export { isObject };
