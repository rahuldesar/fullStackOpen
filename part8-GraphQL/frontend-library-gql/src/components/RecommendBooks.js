import { WHO_AM_I , GET_ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const RecommendBooks = ({show}) => {
  const [ genre, setGenre] = useState("refactoring");
  const { loading : userLoading , data: user } = useQuery(WHO_AM_I);
  const { loading: booksLoading , data : books } = useQuery(GET_ALL_BOOKS ,{
    variables : { genre : genre }
  });
  
  useEffect(() => {
    if(user) { 
      setGenre( user.me.favouriteGenre);
    }
  },[user]) 

  if(userLoading || booksLoading){
    return('Loading CONTENTs');
  } 

  const booksToShow = books.allBooks;

  if(!show) return null;

  return(
    <div>
      <h2>BOOKS OF YOUR FAVOURITE GENRE : {genre.toUpperCase()}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name} </td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    )
};


export default RecommendBooks;