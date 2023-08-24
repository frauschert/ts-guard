import { Guard } from "../types";

const isNull: Guard<null> = (x: unknown): x is null => x == null;

export { isNull };
