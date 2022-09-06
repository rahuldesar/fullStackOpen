const ShowName = ( props ) => (
  <li> 
    {props.person.name} : {props.person.number}
    <button onClick={props.deleteName}> delete </button>
    
    </li>
)

export default ShowName;