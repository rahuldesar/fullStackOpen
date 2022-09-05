import ShowName from "../ShowName";

const Persons =({persons}) =>(
  <ul>
      {persons.map((person) =>
      <ShowName person = {person}  />
      )}
  </ul>
)

export default Persons;
