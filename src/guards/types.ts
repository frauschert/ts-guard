export type Guard<T> = (x: unknown) => x is T;
export type TypeOf<T> = T extends Guard<infer U> ? U : never;
