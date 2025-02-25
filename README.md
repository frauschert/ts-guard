# ts-guard

ts-guard is a typescript library that provides composable type guards.
Its inspired by zod but focusses only on type guards and is more lightweight.

## Installation

```bash
npm install @frauschert/ts-guard
```

## Usage

```typescript
import { isObject, isString, isNumber } from 'ts-guard';

const isPerson = isObject({ name: isString, age: isNumber });
const someValue = ...

if(isPerson(someValue)) {
  /// someValue is Person
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
