import type { Guard } from "../types";

const isNodeEnv = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

let Stream: any;
if (isNodeEnv) {
  try {
    Stream = require("stream").Stream;
  } catch {
    // ignore
  }
}

export function isStream(): Guard<NodeJS.ReadableStream | NodeJS.WritableStream> {
  return (value: unknown): value is NodeJS.ReadableStream | NodeJS.WritableStream => {
    if (!isNodeEnv || !Stream) {
      return false;
    }
    return value instanceof Stream;
  };
}
