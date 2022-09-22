#Exercise 2.6-2.10

## To start a Json-server use something like 

`json-server --port 3001 --watch db.json`

where db.json is a file in current directory


To include it inside your project, save json-server as devDependecies and add a script to run it.

`npm install json-server --save-dev`

then 


add this in scripts section of package.json


`"server": "json-server -p3001 --watch db.json"`


We can now conveniently, without parameter definitions, start the json-server from the project root directory with the command:

`npm run server`



useEffect is used for performing side effects.


Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.


Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup.


we might want to set up a subscription to some external data source. In that case, it is important to clean up so that we don’t introduce a memory leak!

--------------------------------------------------------------------------------------

### Testing 
`npm install --save-dev @testing-library/react @testing-library/jest-dom`

test renders the component with the `render` function provided by the react-testing-library.

We can use the object `screen` to access the rendered component.

useful `screen` methods are :

`getByText`   
`findByText`        `findAllByText`

`getByRole`         `getAllByRole`

`getByPlaceholderText`




For Debugging, we use `screen.debug()`

This gives us HTML view of our test.


`npm install --save-dev @testing-library/user-event`

library `user-event` that makes simulating user input like, button press, easier 


NOTE : `npm install -D --exact jest-watch-typeahead@0.6.5` install this package to solve problem of mismatch between the version of a dependency jest-watch-typeahead that create-react-app and user-event are using. 


--------------------------------------------------------------------------------------

import React from 'react'

import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'


### Running test 

CI=true npm test

CI=true npm test -- --coverage

--------------------------------------------------------------------------------------

`container.querySelector`
