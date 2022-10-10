import { gql } from '@apollo/client';

export const GET_BOOK_COUNT = gql `
  query BookCount{
    bookCount
  }
`

export const GET_AUTHOR_COUNT = gql`
  query AuthorCount{
    authorCount
  }
`
export const GET_ALL_AUTHORS = gql`
  query AllAuthors{
    allAuthors {
      name
      bookCount
      born
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query allBooks($genre : String) {
    allBooks(genre : $genre) {
      title
      published
      author{
        name
        born
        bookCount
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $publishedYear: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedYear,
      genres: $genres
      ) {
      title
      published
      author
      id
    }
  }
`

export const UPDATE_AUTHOR_BIRTHYEAR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      bookCount
      id
      born
    }
  }
`

export const LOGIN_USER = gql ` 
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const WHO_AM_I = gql ` 
  query Me {
    me {
      username
      favouriteGenre
      id
    }
  }
`
