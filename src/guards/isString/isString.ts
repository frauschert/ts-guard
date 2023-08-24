import { Guard } from "../types";

const isString: Guard<string> = (x: unknown): x is string => typeof x == "string";

export { isString };
