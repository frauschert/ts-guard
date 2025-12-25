import type { Guard } from "../types";

const isNodeEnv = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

let EventEmitter: any;
if (isNodeEnv) {
  try {
    EventEmitter = require("events").EventEmitter;
  } catch {
    // ignore
  }
}

export function isEventEmitter(): Guard<NodeJS.EventEmitter> {
  return (value: unknown): value is NodeJS.EventEmitter => {
    if (!isNodeEnv || !EventEmitter) {
      return false;
    }
    return value instanceof EventEmitter;
  };
}
