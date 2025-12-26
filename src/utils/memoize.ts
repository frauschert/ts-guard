import type { Guard } from "../guards/types";

export interface MemoizeOptions {
  maxSize?: number;
  keyFn?: (value: unknown) => string;
}

export function memoize<T>(guard: Guard<T>, options: MemoizeOptions = {}): Guard<T> {
  const { maxSize = 1000, keyFn = defaultKeyFn } = options;
  const cache = new Map<string, boolean>();

  function defaultKeyFn(value: unknown): string {
    try {
      return JSON.stringify(value);
    } catch {
      // Fallback for non-serializable values
      return String(value);
    }
  }

  return (value: unknown): value is T => {
    const key = keyFn(value);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = guard(value);

    // Manage cache size
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    cache.set(key, result);
    return result;
  };
}
