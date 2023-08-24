import { Guard } from "../types";
import { isUndefined } from "../isUndefined";

const isOptional =
  <T>(guard: Guard<T>) =>
  (x: unknown): x is T | undefined =>
    isUndefined(x) || guard(x);

export { isOptional };
