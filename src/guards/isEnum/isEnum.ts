import { EnumLike } from "../../types";
import { isNumber } from "../isNumber";
import { isString } from "../isString";
import { isUnion } from "../isUnion";
import { Guard } from "../types";

export function isEnum<T extends EnumLike>(e: T): Guard<T[keyof T]> {
  const keys = Object.keys(e).filter((k) => !/^\d/.test(k));
  const values = keys.map((k) => e[k]);
  const isStringOrNumber = isUnion([isString(), isNumber()]);
  return (x: unknown): x is T[keyof T] => isStringOrNumber(x) && values.includes(x);
}
