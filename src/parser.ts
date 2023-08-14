import { isString, type Guard, isNumber, isBoolean, isLiteral, isOneOf, isUndefined, isNull, isEnum } from "./guards";
import { EnumLike, Primitive } from "./types";

export type ParseSuccess<T> = { success: true; data: T };
export type ParseError = { success: false; error: Error };
export type ParseResult<T> = ParseSuccess<T> | ParseError;
export type Parser<T> = {
  parse: (x: unknown) => ParseResult<T>;
};

const orParser = <T, U>(a: Parser<T>, b: Parser<U>): Parser<T | U> => ({
  parse: (x: unknown) => (a.parse(x).success || b.parse(x).success ? parseSuccess(x as T | U) : parseError(x, "")),
});

type Infer<T extends Parser<unknown>> = T extends Parser<infer U> ? U : never;

function parseSuccess<T>(arg: T): ParseResult<T> {
  return {
    success: true,
    data: arg,
  };
}

function parseError(val: unknown, typeName: string): ParseError {
  return {
    success: false,
    error: new Error(`\`${JSON.stringify(val)}\` is not a ${typeName}`),
  };
}

const parse =
  <T>(guard: Guard<T>, typeName: string) =>
  (x: unknown) =>
    guard(x) ? parseSuccess(x) : parseError(x, typeName);

const createParser = <T>(guard: Guard<T>, typeName: string): Parser<T> => ({
  parse: parse(guard, typeName),
});

function objectParser<S extends Record<string, Parser<T>>, T = unknown>(
  schema: S,
): Parser<{
  [K in keyof S]: Infer<S[K]>;
}> {
  const parse = (x: unknown) => {
    if (!x) return parseError(x, "object");
    if (typeof x !== "object") return parseError(x, "object");
    if (Array.isArray(x)) return parseError(x, "object");
    return Object.keys(schema)
      .map((k) => schema[k].parse((x as any)[k]))
      .every((res) => res.success)
      ? parseSuccess(
          x as {
            [K in keyof S]: Infer<S[K]>;
          },
        )
      : parseError(x, "object");
  };
  return {
    parse,
  };
}

const p = {
  string: () => createParser(isString, "string"),
  number: () => createParser(isNumber, "number"),
  boolean: () => createParser(isBoolean, "boolean"),
  undefined: () => createParser(isUndefined, "undefined"),
  null: () => createParser(isNull, "null"),
  literal: <T extends Primitive>(val: T) => createParser(isLiteral(val), "literal"),
  isOneOf: <U extends string | number, T extends readonly [U, ...U[]]>(val: T) => createParser(isOneOf(val), "oneof"),
  object: objectParser,
  optional: <T>(val: Parser<T>) => orParser(val, p.undefined()),
  enum: <T extends EnumLike>(e: T) => createParser(isEnum(e), "enum"),
};

export { p };
