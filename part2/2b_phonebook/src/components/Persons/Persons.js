import ShowName from "../ShowName";

const Persons =({persons}) =>(
  <ul>
      {persons.map((person) =>
      <ShowName key= {person.id} person = {person}  />
      )}
  </ul>
)

export default Persons;
