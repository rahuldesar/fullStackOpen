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