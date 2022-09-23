Redux app . 

Alternative to FLUX (created by Facebook).

Even facebook uses Redux nowadays.

Some basic terms of Redux : 

`Action` -- 
An action is a plain JavaScript object that has a `type` field.

`Reducers` --
A reducer is a function that receives the current `state` and an `action` object, decides how to update the state.

`Store` --
The current Redux application state lives in an object called the `store`.

`Dispatch` -- 
The only way to update the state is to call `store.dispatch()` and pass in an action object.

`Selectors` --
`Selectors` are functions that know how to extract specific pieces of information from a store state value.
<img src="https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif" width="400px">