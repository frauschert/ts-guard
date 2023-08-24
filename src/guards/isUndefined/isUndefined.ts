import { Guard } from "../types";

const isUndefined: Guard<undefined> = (x: unknown): x is undefined => x === undefined;

export { isUndefined };
