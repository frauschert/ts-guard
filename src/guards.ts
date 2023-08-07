import { Primitive, UnionToIntersection } from "./types";

export type Guard<T> = (x: unknown) => x is T;
export type TypeOf<T> = T extends Guard<infer U> ? U : never;
type PropertyGuards<A extends Record<string, unknown>> = {
  [K in keyof A]: Guard<A[K]>;
};

export declare type EnumLike = {
  [k: string]: string | number;
  [nu: number]: string;
};

const isString: Guard<string> = (x: unknown): x is string => typeof x == "string";
const isNumber: Guard<number> = (x: unknown): x is number => typeof x == "number";
const isBoolean: Guard<boolean> = (x: unknown): x is boolean => typeof x == "boolean";

const isObject =
  <T extends Record<string, unknown>>(propertyGuards: PropertyGuards<T>): Guard<T> =>
  (x: unknown): x is T =>
    typeof x == "object" &&
    !isNull(x) &&
    Object.entries(propertyGuards).every(([key, value]) => value((x as any)[key]));

const isArrayOf =
  <A>(itemGuard: Guard<A>): Guard<A[]> =>
  (x: unknown): x is A[] =>
    Array.isArray(x) && x.every(itemGuard);

const isNull: Guard<null> = (x: unknown): x is null => x == null;
const isUndefined: Guard<undefined> = (x: unknown): x is undefined => x === undefined;

const isOptional =
  <T>(guard: Guard<T>) =>
  (x: unknown): x is T | undefined =>
    isUndefined(x) || guard(x);

const or = <T, U>(a: Guard<T>, b: Guard<U>) => isUnion([a, b]);

const isUnion =
  <T extends readonly [Guard<unknown>, ...Guard<unknown>[]]>(guards: T): Guard<TypeOf<T[number]>> =>
  (x: unknown): x is TypeOf<T[number]> =>
    guards.some((guard) => guard(x));

const and =
  <T, U>(a: Guard<T>, b: Guard<U>): Guard<T & U> =>
  (x: unknown): x is T & U =>
    a(x) && b(x);

const isIntersection =
  <T extends readonly [Guard<unknown>, ...Guard<unknown>[]]>(
    guards: T,
  ): Guard<UnionToIntersection<TypeOf<T[number]>>> =>
  (x: unknown): x is UnionToIntersection<TypeOf<T[number]>> =>
    guards.every((guard) => guard(x));

const isOneOf =
  <U extends string | number, T extends readonly [U, ...U[]]>(values: T): Guard<T[number]> =>
  (x: unknown): x is T[number] =>
    values.some((v) => v === x);

const isLiteral =
  <T extends Primitive>(value: T): Guard<T> =>
  (x: unknown): x is T =>
    x === value;

function isEnum<T extends EnumLike>(e: T): Guard<T[keyof T]> {
  const keys = Object.keys(e).filter((k) => {
    return !/^\d/.test(k);
  });
  const values = keys.map((k) => {
    return e[k];
  });
  return (x: unknown): x is T[keyof T] =>
    (or(isString, isNumber)(x) && values.includes(x)) || (isString(x) && keys.includes(x));
}

export {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArrayOf,
  isNull,
  isUndefined,
  isOptional,
  or,
  isUnion,
  and,
  isIntersection,
  isEnum,
  isOneOf,
  isLiteral,
};
