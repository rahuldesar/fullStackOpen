## TYPESCRIPT .. walkthrough
<a href="https://www.typescriptlang.org/play/index.html"> TS PLAYGROUND </a>


TypeScript offers features such as better `development-time tooling`, `static code analysis`, `compile-time type checking` and `code level documentation`.

### KEY LANGUAGE FEATURES of typescript.

- TYPE ANNOTATIONS
  
    `a: string`

- STRUCTURAL TYPING

- TYPE INFERENCE

- TYPE ERASURE

NOTE : TypeScript type annotations and type checking exist only at compile time and no longer at runtime. Even if the compiler does not throw any errors, runtime errors are still possible. These runtime errors are especially common when handling external input, such as data received from a network request.



`npm install --save-dev ts-node typescript`

<a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases"> TYPE alias </a>

`type Operation = 'multiply' | 'add' | 'divide'`


### unknown type in error.

- `catch (error: unknown)`

### <a href="https://github.com/DefinitelyTyped/DefinitelyTyped">Definitely Typed</a>

- `@types/{npm_package}`

## interface ....