import { gql, useQuery} from '@apollo/client';

const ALL_PERSONS = gql`
query{
  allPersons{
    name
    phone
    id
  }
}

`

const App = ( ) => {
  const result = useQuery(ALL_PERSONS);

  if(result.loading){
    return <div> LOADING RESULTS... </div>
  }
  console.log(result.data.allPersons);

  
  return(
    <div>
      { result.data.allPersons.map(person => person.name).join('') }
    </div>
  )
};

export default App;