import { useQuery, useMutation } from "@apollo/client"
import { GET_ALL_AUTHORS, UPDATE_AUTHOR_BIRTHYEAR } from "../queries"
import { useState, } from "react";


const Authors = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  
  const allAuthors = useQuery(GET_ALL_AUTHORS);
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR_BIRTHYEAR,{
    refetchQueries : [ {query: GET_ALL_AUTHORS} ]
  });
  
  if (!props.show) {
    return null; 
  };

  if(allAuthors.loading){
    return <div>LOADING AUTHOR</div>
  }


  const authors = allAuthors.data.allAuthors;
  console.log(authors);
  const authorUpdateHandler = (event) => {
    event.preventDefault();
    const setBornTo = Number(birthYear);
    updateAuthor({ variables: {name : authorName, setBornTo }});

    setAuthorName('');
    setBirthYear('');
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={authorUpdateHandler }>

{/* OPTED to use html datalist instead of select tag, react select, */}
        <div style={{marginBottom:'10px'}}>
          <input type="text" 
            value={ authorName } 
            list="authorNames" 
            placeholder="Author Name"
            onChange={(event) => setAuthorName(event.target.value)} 
          />
          <datalist id="authorNames" >
            {authors.map(authors => 
              <option key={authors.name} value= {authors.name} />
            )}
          </datalist>
        </div>

        <input type="text"
          value={ birthYear }
          placeholder="Birth Year"
          style={{marginBottom:'10px'}}
          onChange={(event) => setBirthYear(event.target.value)}
        />
        <br />
        
        <button type="submit"> Update Author </button>
      </form>
    </div>
  )
}

export default Authors;
