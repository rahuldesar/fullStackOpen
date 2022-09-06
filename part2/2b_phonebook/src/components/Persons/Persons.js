import ShowName from "../ShowName";

const Persons =({persons, deleteName}) =>{  
  return (
  <ul>
      {persons.map((person, i) =>
      <ShowName key= {i} person = {person} deleteName ={ () => deleteName(person.id) }  />
      
      )}
  </ul>
)}

export default Persons;
