import { GET_ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react";

const Books = (props) => {
  const [genreToShow, setGenreToShow ] = useState(null);
  const allBooks = useQuery(GET_ALL_BOOKS );
  
  if(allBooks.loading){
    return <div> LOADING Books</div>
  }
  
  if (!props.show) {
    return null
  }

  const books = allBooks.data.allBooks;
  
  //! This might be better if genreSet is received from Backend .
  // * 8.19 ---> In this exercise, the filtering can be done using just React <--- 
  // * SO THIS will do just fine.
  let allGenres = [];
  books.forEach( book => {
    const genreList = book.genres;
    allGenres = [...allGenres, ...genreList];
  })
  const genreSet = new Set(allGenres);
  const genreSetArray = Array.from(genreSet);     // ? Basically getting set of GENRES FROM books 
  

  let booksToShow;
  if( genreToShow != null ) { 
    booksToShow = books.filter(book => 
      book.genres.includes(genreToShow)  
    );
  } else {
    booksToShow = books;
  }


  // ! using `event.target.innerText`  isn't very optimal but it works . :)
  const handleGenreSet = (event) =>{
    if(event.target.innerText === 'All'){
      setGenreToShow(null); 
    } else {
      setGenreToShow(event.target.innerText);
    }
  };
  
  return (
    <div>
      <h2>books</h2>

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
      {
        genreSetArray.map( genre => 
          <button key={genre} onClick={handleGenreSet}>{genre} </button>
        )
      }
          <button onClick={handleGenreSet}>All</button>

    </div>
  )
}

export default Books
