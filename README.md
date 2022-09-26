# Things to Remember for Dev

1. [Warning](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#do-not-define-components-within-components) create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository.
<b>Most likely you do not want each of your projects to be a separate repository</b>, so simply run the `rm -rf .git` command at the root of your application.

In some situations you may also have to run the command below from the root of the project:
`rm -rf node_modules/ && npm i`



`"react": "^17.0.2"`
`"react-dom": "^17.0.2"`
are used, Since Apolli client used later in part8 is incompatible with current version of react.



## Part 2 Altering the server .

 we will be taking a look at the conventional use of routes, aka URLs and HTTP request types, in REST.

 ### REST

 In REST terminology, we refer to individual data objects, such as the notes in our application, as resources.

 Every resource has a unique address associated with it - its URL

 According to a general convention used by json-server, we would be able to locate an individual note at the resource URL `notes/3`, where `3` is the id of the resource.

 The `notes` url, on the other hand, would point to a resource collection containing all the notes.

 Resources are fetched from the server with `HTTP GET` requests.

Creating a new resource for storing a note is done by making an `HTTP POST` request.

json-server requires all data to be sent in JSON format. i.e request must contain `Content-Type` request header with the value `application/json`


`An important detail to remember is that the concat method does not change the component's original state, but instead creates a new copy of the list.`


-----------------------------------------------------------------------------

-----------------------------------------------------------------------------

## axios 
## express
## json-server
## nodemon
## mongoose
## fly.io / heroku
## dotenv
## jest  >  mocha -> for integration and unit testing
## CORS
## eslint
## crossenv? for windows 
## supertest
## express-async-errors
## bcrypt
## jsonwebtoken / JWT
## propTypes
## cypress -> for E2E testing 
## redux
## redux-thunk


-----------------------------------------------------------------------------

-----------------------------------------------------------------------------


### chakra ui // material ui

<b>sudo kill -9 `sudo lsof -t -i:3001` </b>

