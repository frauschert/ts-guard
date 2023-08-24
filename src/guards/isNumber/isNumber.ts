import { Guard } from "../types";

const isNumber: Guard<number> = (x: unknown): x is number => typeof x == "number";

export { isNumber };
