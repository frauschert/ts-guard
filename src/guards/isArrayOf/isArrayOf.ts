import { Guard } from "../types";

const isArrayOf =
  <A>(itemGuard: Guard<A>): Guard<A[]> =>
  (x: unknown): x is A[] =>
    Array.isArray(x) && x.every(itemGuard);

export { isArrayOf };
