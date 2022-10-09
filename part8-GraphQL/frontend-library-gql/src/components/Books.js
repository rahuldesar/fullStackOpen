import { GET_ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const allBooks = useQuery(GET_ALL_BOOKS );
  
  if(allBooks.loading){
    return <div> LOADING Books</div>
  }
  
  if (!props.show) {
    return null
  }

  const books = allBooks.data.allBooks;
  console.log('💀 ~ file: Books.js ~ line 16 ~ Books ~ books', books)

  let allGenres = [];

  books.forEach( book => {
    const genreList = book.genres;
    allGenres = [...allGenres, ...genreList];
  })

  const genreSet = new Set(allGenres);
  console.log('💀 ~ file: Books.js ~ line 26 ~ Books ~ genreSet', genreSet)

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
          {books.map((a) => (
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
}

export default Books
