import type { Guard } from "../types";

const isNodeEnv = typeof process !== "undefined" && 
                 process.versions != null && 
                 process.versions.node != null;

export function isBuffer(): Guard<Buffer> {
  return (value: unknown): value is Buffer => {
    if (!isNodeEnv) {
      // In non-Node environments, nothing is a Buffer
      return false;
    }
    return Buffer.isBuffer(value);
  };
}