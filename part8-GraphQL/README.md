# GRAPHQL

The main principle of GraphQL is that the code on the browser forms a query describing the data wanted, and sends it to the API with an HTTP POST request.

 Unlike REST, all GraphQL queries are sent to the same address, and their type is POST.


 ## Two types 

 1) determines the field and their type . ! = required.

 2) Query : Practically every GraphQL schema describes a Query, which tells what kind of queries can be made to the API. 


## Queries and Mutation
 ### Fields

 GraphQL is all about asking for specific fields on `OBJECTS`.
 ### Arguments

Ability to pass arguments to fields.  In GraphQL, every field and nested object can get its own set of arguments.
 ### Aliases

They let you rename the result of a field to anything you want. Prevents Name conflict, i.e we can use different names for same field as aliases.
 ### Fragments

 `Reusable units` .  Fragments let you construct sets of fields, and then include them in queries where you need to.

 Variables can be used inside Fragments.
 ### Operation Name

 `Operation type` is either `query`, `mutation`, or `subscription`.

 `Operation name` is a meaningful and explicit name for your operation.
 ### Variables

 When we start working with variables, we need to do three things:

1.Replace the static value in the query with `$variableName`

2.Declare `$variableName` as one of the variables accepted by the query

3.Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary


All declared variables must be either scalars, enums, or input object types
 ### Directives

 Dynamically change the structure and shape of our queries using variables. 

 Two Types :-

 `@include(if: Boolean)`

 `@skip(if: Boolean)`


 ### Mutation

 writes should be sent explicitly via a mutation.

#### MAIN DIFFERENCE BETWEEN QUERY AND MUTATION

`While query fields are executed in parallel, mutation fields run in series, one after the other.`

 ### Inline Fragments
 ### Meta Fields
 

===========================================================================================

## Schemas and Types
### Type System
### Type Language 
### Object Types and fields
### Arguments
### The Query and Mutation Types
### Scalar Types 
### Enumeration Types 
### Lists and Non-nulls
### Interfaces 
### Union Types
### Input Types



## Validation


