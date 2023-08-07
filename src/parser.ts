import { isString, type Guard, isNumber, isBoolean, isLiteral, isOneOf } from "./guards";
import { Primitive } from "./types";

type Assert<T> = (x: unknown) => asserts x is T;
type ParseSuccess<T> = { success: true; data: T };
type ParseError = { success: false; error: Error };
type ParseResult<T> = ParseSuccess<T> | ParseError;
type Parser<T> = {
  parse: (x: unknown) => ParseResult<T>;
};
type ParserFactory<T, U = never> = U extends never ? () => Parser<T> : (val: U) => Parser<T>;

type P = {
  string: () => Parser<string>;
  number: () => Parser<number>;
  boolean: () => Parser<boolean>;
  literal: <T extends Primitive>(val: T) => Parser<T>;
  isOneOf: <U extends string | number, T extends readonly [U, ...U[]]>(val: T) => Parser<T[number]>;
  object: <S extends Record<string, Parser<T>>, T = unknown>(schema: S) => Parser<{ [K in keyof S]: Infer<S[K]> }>;
};
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
    error: new Error(`\`${val}\` is not a ${typeName}`),
  };
}

function assert<T, G extends Guard<T>>(val: unknown, guard: G): asserts val is T {
  if (!guard(val)) throw new Error("");
}

const parseFn =
  <T>(guard: Guard<T>, typeName: string) =>
  (x: unknown) =>
    guard(x) ? parseSuccess(x) : parseError(x, typeName);

const createParser = <T>(guard: Guard<T>, typeName: string): Parser<T> => ({
  parse: parseFn(guard, typeName),
});

function objectParser<S extends Record<string, Parser<T>>, T = unknown>(
  schema: S,
): Parser<{
  [K in keyof S]: Infer<S[K]>;
}> {
  return {
    parse: (x: unknown) => {
      if (!x) return parseError(x, "object");
      if (typeof x !== "object") return parseError(x, "object");
      if (Array.isArray(x)) return parseError(x, "object");
      return Object.keys(schema)
        .filter((k) => k in x)
        .map((k) => schema[k].parse((x as any)[k]))
        .every((res) => res.success)
        ? parseSuccess(
            x as {
              [K in keyof S]: Infer<S[K]>;
            },
          )
        : parseError(x, "object");
    },
  };
}

const p: P = {
  string: () => createParser(isString, "string"),
  number: () => createParser(isNumber, "number"),
  boolean: () => createParser(isBoolean, "boolean"),
  literal: <T extends Primitive>(val: T) => createParser(isLiteral(val), "literal"),
  isOneOf: <U extends string | number, T extends readonly [U, ...U[]]>(val: T) => createParser(isOneOf(val), "oneof"),
  object: objectParser,
};

export { p };
