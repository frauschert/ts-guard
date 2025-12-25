import type { Guard } from "../types";

const hexColorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const isHexColor: Guard<string> = (value: unknown): value is string => {
  return typeof value === "string" && hexColorRegex.test(value);
};
