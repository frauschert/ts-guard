# ts-guard Copilot Instructions

## Project Overview
ts-guard is a lightweight TypeScript library providing composable type guards with full type inference. It's inspired by zod but focuses exclusively on runtime type checking without schema validation. The library supports tree-shaking through multiple entry points.

## Architecture

### Core Type System
- `Guard<T>`: Base type `(x: unknown) => x is T` - all guards follow this pattern
- `TypeOf<T>`: Extracts the inferred type from a guard (see [src/guards/types.ts](../src/guards/types.ts))
- Guards are **factory functions** that return type predicates, not direct predicates

### Module Organization
```
src/guards/
├── primitive.ts    → exports primitive guards (isString, isNumber, etc.)
├── compound.ts     → exports complex guards (isObject, isArrayOf, isUnion, etc.)
├── node.ts         → exports Node.js-specific guards (isBuffer)
├── index.ts        → re-exports all guards
└── is{TypeName}/   → each guard in its own folder with implementation + tests
```

### Entry Points (package.json exports)
- `.` → all guards
- `./primitive` → primitive type guards only
- `./compound` → complex/compound guards only  
- `./node` → Node.js-specific guards

## Key Patterns

### Guard Implementation Pattern
```typescript
// Factory function that returns a Guard<T>
export function isString(constraints?: StringConstraints): Guard<string> {
  return (value: unknown): value is string => {
    // Type check first
    if (typeof value !== "string") return false;
    // Then validate constraints
    // Always return boolean
  };
}
```

### Constraints Pattern
Guards accept optional constraint objects for validation (e.g., `minLength`, `maxLength`, `pattern` for strings). See [src/guards/isString/isString.ts](../src/guards/isString/isString.ts) for reference.

### Composition Pattern
Higher-order guards accept other guards as parameters:
```typescript
const isOptional = <T>(guard: Guard<T>) => 
  (x: unknown): x is T | undefined => isUndefined(x) || guard(x);
```

### Object Guard Pattern
Uses `PropertyGuards<T>` mapped type to ensure each property has a corresponding guard. See [src/guards/isObject/isObject.ts](../src/guards/isObject/isObject.ts).

## TypeScript Paths
Use path aliases in source code:
- `@guards/*` → `src/guards/*`
- `@types` → `src/types`

These are defined in [tsconfig.json](../tsconfig.json) and should be used for imports within `src/`.

## Development Workflow

### Running Tests
```bash
npm test              # Run all tests with Jest
npm test -- --watch   # Watch mode
```
Tests use `ts-jest` preset and live alongside implementation files (`*.test.ts`).

### Building
```bash
npm run build
```
Compiles TypeScript from `src/` to `lib/` with declarations, source maps, and declaration maps. The build **removes** test files (excluded via tsconfig).

### Code Quality
```bash
npm run lint          # Check with ESLint
npm run lint:fix      # Auto-fix issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting
```

## Testing Conventions
- Each guard has a co-located `*.test.ts` file
- Test both positive and negative cases
- Test type boundaries (null, undefined, wrong types)
- For guards with constraints, test each constraint independently and in combination
- Example structure:
  ```typescript
  describe("isString", () => {
    it("should validate basic strings", () => { ... });
    it("should validate minLength constraint", () => { ... });
    it("should handle multiple constraints", () => { ... });
  });
  ```

## Adding New Guards

1. Create folder `src/guards/is{TypeName}/`
2. Implement guard in `is{TypeName}.ts`:
   - Export factory function returning `Guard<T>`
   - Add constraints interface if needed
   - Use type predicate syntax: `value is T`
3. Add comprehensive tests in `is{TypeName}.test.ts`
4. Export from appropriate entry point:
   - `primitive.ts` for primitives
   - `compound.ts` for complex types
   - `node.ts` for Node.js-specific types

## Important Conventions
- **Never** call guards directly in other guards without invoking them (guards are factories)
- Entry point files (`primitive.ts`, `compound.ts`, `node.ts`) only contain re-exports, no logic
- The main `index.ts` exports from `@guards/*` using path aliases
- Type exports (`Guard`, `TypeOf`) must be available in all entry points
- Maintain tree-shaking: set `"sideEffects": false` in package.json
- Build output (`lib/`) mirrors `src/` structure for proper entry point resolution
