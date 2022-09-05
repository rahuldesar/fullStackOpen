const ShowName = ( props ) => (
  <li key={props.person.id} > {props.person.name} : {props.person.number}</li>
)

export default ShowName;