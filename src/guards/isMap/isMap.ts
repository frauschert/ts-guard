import { Guard } from "../types";

export function isMap<K, V>(keyGuard: Guard<K>, valueGuard: Guard<V>): Guard<Map<K, V>> {
  return (value: unknown): value is Map<K, V> => {
    if (!(value instanceof Map)) {
      return false;
    }

    for (const [key, val] of value.entries()) {
      if (!keyGuard(key) || !valueGuard(val)) {
        return false;
      }
    }

    return true;
  };
}
