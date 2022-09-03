# Things to Remember for Dev
1. [Warning](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#do-not-define-components-within-components) create-react-app will automatically turn your project into a git-repository unless you create your application inside of an existing git repository.
<b>Most likely you do not want each of your projects to be a separate repository</b>, so simply run the `rm -rf .git` command at the root of your application.

In some situations you may also have to run the command below from the root of the project:
`rm -rf node_modules/ && npm i`