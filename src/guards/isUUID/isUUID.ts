import type { Guard } from "../types";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const isUUID: Guard<string> = (value: unknown): value is string => {
  return typeof value === "string" && uuidRegex.test(value);
};
