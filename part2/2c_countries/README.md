#Exercise 2c_Countries


useEffect is used for performing side effects.


<b>Data fetching, setting up a subscription, and manually changing the DOM</b> in React components are all examples of side effects.


<b>Network requests, manual DOM mutations, and logging</b> are common examples of effects that don’t require a cleanup.


we might want to set up a <b>subscription to some external data source</b>. In that case, it is important to clean up so that we don’t introduce a memory leak!


### Summary / Things I learned (for future reference)

-learned to use useEffect hook. 

-usage of axios (little bit)

-using map for showing json data

-using Object.Keys to get array of keys to map over json data 
with unknown keys. <b>NOTE</b> : THERE ARE OTHER WAYS TOO,CHECK THEM OUT LATER

-usage of API with or without key

-Proper seperation of components

-little bit about environment variable (adding custom 
environment variables)

`REACT_APP_` not `NODE_ENV`

it will be defined in  `process.env` and can be used as :

`process.env.REACT_APP_[VARIABLE_NAME]`

### extra added features.

-Showing Loading screen while fetching data

-toggling show/hide button 

### NOTES to self.

-Adding ID to listed elements is still pain in the ass.

-Wasted like 2 hours trying to figure out a problem related to Event loops -> webAPI -> callback queue (LIFECYCLE? ) 

after setting the state from set[stateName] by using useEffect (Data fetching), the data is received in second loop only .So, console logging may generate error if data isnt present.