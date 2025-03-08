# ts-guard

ts-guard is a TypeScript library that provides composable type guards.
It's inspired by zod but focuses only on type guards and is more lightweight.

## Installation

```bash
npm install @frauschert/ts-guard
```

## Features

- 🎯 Pure TypeScript
- 💡 First-class type inference
- 🔒 Runtime type checking
- 🧩 Composable guards
- 🪶 Lightweight with treeshaking support
- 📘 Well documented

## Basic Usage

```typescript
import { isObject, isString, isNumber } from '@frauschert/ts-guard';

const isPerson = isObject({ name: isString(), age: isNumber() });
const value = { name: "John", age: 30 };

if (isPerson(value)) {
  // value is typed as { name: string; age: number }
  console.log(value.name); // TypeScript knows this is safe
}
```

## Optimizing Bundle Size

The library provides several entry points to help you optimize your bundle size:

```typescript
// Import only primitive type guards
import { isString, isNumber } from '@frauschert/ts-guard/primitive';

// Import only compound type guards
import { isObject, isArray } from '@frauschert/ts-guard/compound';

// Import Node.js specific guards (only in Node.js environment)
import { isBuffer } from '@frauschert/ts-guard/node';
```

## Available Guards

### Primitive Types
```typescript
import { isString, isNumber, isBoolean, isBigInt } from '@frauschert/ts-guard/primitive';

isString({ minLength: 3, maxLength: 10, pattern: /^[A-Z]/, trim: true })
isNumber({ min: 0, max: 100, integer: true, positive: true })
isBoolean()
isBigInt({ min: 0n, max: 100n, positive: true })
```

### Complex Types
```typescript
import { isDate, isArrayOf, isObject, isInstanceOf } from '@frauschert/ts-guard/compound';

isDate()
isArrayOf(isString())
isObject({ name: isString(), age: isNumber() })
isInstanceOf(MyClass)
```

### Type Composition
```typescript
import { isUnion, isIntersection, isEnum, isOptional, isOneOf } from '@frauschert/ts-guard/compound';

// Union types
const isStringOrNumber = isUnion([isString(), isNumber()]);

// Intersection types
const isPerson = isObject({ name: isString() });
const hasAge = isObject({ age: isNumber() });
const isPersonWithAge = isIntersection([isPerson, hasAge]);

// Enum validation
enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' }
const isStatus = isEnum(Status);

// Optional values
const isOptionalString = isOptional(isString());

// Literal values
const isRole = isOneOf(['admin', 'user', 'guest']);
```

### Node.js Specific Types
```typescript
import { isBuffer } from '@frauschert/ts-guard/node';

// Only available in Node.js environment
isBuffer()
```

## Type Inference

The library provides full type inference:

```typescript
import { isObject, isString, isNumber, TypeOf } from '@frauschert/ts-guard';

const isPerson = isObject({
  name: isString(),
  age: isNumber({ positive: true }),
  email: isOptional(isString())
});

type Person = TypeOf<typeof isPerson>;
// Inferred as: {
//   name: string;
//   age: number;
//   email?: string | undefined;
// }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
