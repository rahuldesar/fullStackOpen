import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
// import PersonForm from './PersonForm';

const FIND_PERSON = gql`
query FindPerson($nameToSearch : String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    address{
      city
      street
    }    
  }
}
`


const Person = ({person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city} 
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}> close </button>
    </div>
  )
};  



  
const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables : { nameToSearch },
    skip : !nameToSearch
  })

  if( nameToSearch && result.data){
    return(
      <Person 
        person = {result.data.findPerson}
        onClose = {() => setNameToSearch(null)}
      />
    )
  }


  return(
    <div>
      <h2>Persons</h2>
      {persons.map(person => 
        <div key={person.id}>
          {person.name} - {person.phone}
          <button onClick={() => setNameToSearch(person.name)} > Show Address</button>  
        </div>
      )}
    </div>
  )
}


export default Persons;