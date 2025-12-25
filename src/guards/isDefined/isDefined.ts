import type { Guard } from "../types";

export const isDefined: Guard<{}> = (value: unknown): value is {} => {
  return value != null;
};
