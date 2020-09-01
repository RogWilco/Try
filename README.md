# Try

[![NPM Package][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]

A lightweight module that enables typed catch blocks.

## Requirements

- **[ES2015+](http://www.ecma-international.org/ecma-262/6.0/)**
- **[TypeScript 2.2+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html)**
- **[Node.js 10.0+](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V10.md#10.0.0)**

> _Note: Please consider these caveats for [ES5](https://stackoverflow.com/questions/41102060/typescript-extending-error-class) and [TypeScript 2.1](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work) when using this library in an unsupported environment._

## Install

```
$ npm install @rogwilco/try
```

## Documentation

[<img src="https://typedoc.org/images/logo-32.png" width="16"> TypeDoc Documentation][docs-url]

## Usage

Try can be used in two different styles depending on preference.

### Chaining

The chaining API completely replaces the usage of native try/catch/finally
blocks. Simply start a chain with `Try()`, providing a function for the try block,
followed by similar invocations of `Catch()` for each type of error you want to
handle, and an optinal `Finally()` block. All usages must include a trailing
call to `Done()` to ensure your code is executed.

```typescript
import Try from 'Try'

Try(() => {
  // This block will be executed until an error is thrown.
  throw new ReferenceError('Something went wrong!')
})
  .Catch(ReferenceError, e => {
    // This block is only invoked if a ReferenceError is thrown.
    console.error(`Reference Error: ${e.message}`)
  })
  .Catch(TypeError, e => {
    // This block is only invoked if a TypeError is thrown.
    console.error(`Type Error: ${e.message}`)
  })
  .Finally(() => {
    // This block is executed regardless of wheter any errors were caught.
  })
  .Done()
```

### Native

The native approach preserves the use of native try/catch/finally blocks, and
provides a `Handle()` function for use within the catch block. The `Handle()`
function will manage the handling of different error types (and will
automatically re-throw an unmatched error).

```typescript
import { Handle } from 'Try'

try {
  // This block will be executed until an error is thrown.
  throw new ReferenceError('Something went wrong!')
} catch (e) {
  Handle(e, {
    // This block is only invoked if a ReferenceError is thrown.
    ReferenceError: e => {
      console.error(`Reference Error: ${e.message}`)
    },
    // This block is only invoked if a TypeError is thrown.
    TypeError: e => {
      console.error(`Type Error: ${e.message}`)
    }
  })
} finally {
  // This block is executed regardless of wheter any errors were caught.
}
```

[npm-image]: https://img.shields.io/npm/v/@rogwilco/try?logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/package/@rogwilco/try
[ci-image]: https://img.shields.io/github/workflow/status/rogwilco/try/CI?logo=GitHub&logoColor=white
[ci-url]: https://github.com/RogWilco/try/actions?query=workflow%3ACI
[coverage-image]: https://img.shields.io/codecov/c/github/rogwilco/try?logo=codecov&logoColor=white
[coverage-url]: https://codecov.io/gh/rogwilco/try
[docs-image]: https://rogwilco.github.io/Try/assets/images/logo-32.png
[docs-url]: https://rogwilco.github.io/Try/globals.html
