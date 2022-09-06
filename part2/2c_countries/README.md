#Exercise 2c_Countries


useEffect is used for performing side effects.


<b>Data fetching, setting up a subscription, and manually changing the DOM</b> in React components are all examples of side effects.


<b>Network requests, manual DOM mutations, and logging</b> are common examples of effects that don’t require a cleanup.


we might want to set up a <b>subscription to some external data source</b>. In that case, it is important to clean up so that we don’t introduce a memory leak!