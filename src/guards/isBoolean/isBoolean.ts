import { Guard } from "../types";

const isBoolean: Guard<boolean> = (x: unknown): x is boolean => typeof x == "boolean";

export { isBoolean };
