require('dotenv').config();

const { ApolloServer, gql , UserInputError} = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const db = process.env.MONGODB_URI;
const jwt_secret = process.env.SECRET;

mongoose.connect(db)
  .then( result => { 
    console.log('CONNECTING TO DB \n',db);
  })
  .catch( ( error ) => {
    console.log('ERROR CONNECTING TO MONGODB ====> ', error.message );
  });

  const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Author { 
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book { 
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String , genre : [String!]): [Book!]!
    me: User
  },


  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`
// allBooks(author: String): [Book!]!
// !allBooks  FIX LATER
// !bookCount   FIX LATER
// !author   FIX LATER
// !editAuthor   FIX LATER


const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    
    authorCount: async() => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      return await Book.find({});
      
      // TODO IMPLEMENT FILTER
      // ! REMOVING TEMPORARILY
    /*   const filterByGenre = (authorBooks, genreToFilter) => 
        authorBooks.filter(book => book.genres.includes(genreToFilter))

      if( !args.author ) {
        if(!args.genre) return books;
        else return filterByGenre(books, args.genre);
      } else {
        const authorsBook = books.filter(book => book.author === args.author);
        if(!args.genre) return authorsBook;
        else return filterByGenre(authorsBook, args.genre);
      } */


    },

    allAuthors : async() => Author.find({}),

    me : (root, args ,context) => context.currentUser,
  },

  Author: {
    bookCount: async (root) => {
      let authorId = null;
      let author = await Author.findOne({name : root.name});
      authorId = author._id;

      if(authorId === null) { return 0; }

      let booksByAuthor = await Book.find({author : authorId});
      return booksByAuthor.length;
    }
  },

  Mutation: {
    // addBook : async (root, args) => {
    //   let bookAuthor = null;
    //   let authorId = null; 
      
    //   const existingAuthor = await Author.findOne({ name : args.author});
    //   if(existingAuthor !== null && existingAuthor.id !== null){
    //     authorId = existingAuthor._id;
    //   } 
      
    //   if(authorId == null){ 
    //     try {
    //       bookAuthor = new Author({ name : args.author });
    //       await bookAuthor.save();
    //     }
    //     catch (error) {
    //       throw new UserInputError(error.message, {
    //         invalidArgs: args,
    //       })
    //     }
    //   } else {
    //     bookAuthor = await Author.findById(authorId);
    //   }


    //   const book = new Book({ ...args, author: bookAuthor});
    //   const author = new Author({name : args.author});
    //   await author.save();
    //   await book.save();
    //   return book;
      
    //   // ? TO IMPLEMENT MONGOOSE ..
    //   /* // CHECKING IF BOOK IS ALREADY ADDED . (not sure if necessary)
    //   if(books.find(book => book.title === args.title)){
    //     throw new UserInputError('BOOKNAME MUST BE UNIQUE',{
    //       invalidArgs: args.title,
    //     })
    //   }

    //   const book = {...args, id: uuid()};

    //   //CHECKING IF AUTHOR ALREADY EXISTS.
    //   if(!authors.find(author => author.name === args.author)){
    //     const author = {name: args.author, id: uuid()};
    //     authors = authors.concat(author);
    //   }

    //   books = books.concat(book);
    //   return book; */
    // },



    addBook: async (root, args, {currentUser}) => {
      let bookAuthor = null
      let authorId = null
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated, please sign in')
      }

      const existingAuthor = await Author.findOne({ name: args.author })
      if (existingAuthor !== null && existingAuthor._id !== null) {
        authorId = existingAuthor._id
      }

      if (authorId === null) {
        try {
          bookAuthor = new Author({ name: args.author })
          await bookAuthor.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalid: args,
          })
        }

      }
      else {
        bookAuthor = await Author.findById(authorId)
      }

      const book = new Book({
        ...args, author: bookAuthor
      })

      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalid: args,
        })
      }

      return book
    },


    editAuthor: async (root, args, {currentUser}) => {

      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated, please sign in')
      }
      // TODO : add exception Handler and Condition Checking
      let author = await Author.findOne({ name : args.name })
      author.born = args.setBornTo;
      await author.save();
      return author;
      
      // ? TO IMPLEMENT MONGOOSE
      /* let tempAuthor = authors.find(author => author.name === args.name);
      if(!tempAuthor) return null;

      const changedAuthor = {...tempAuthor, born: args.setBornTo};
      authors = authors.map( author => 
        (author.name === args.name)? changedAuthor: author
      );
      return changedAuthor; */
    },

    createUser: async (root,args) => {
      let user = new User({...args});
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root,args) => {
      let user = await User.find({username : args.username});
      if(!user && args.password !=="secret"){
        throw new UserInputError("wrong Credentials");
      }

      const userForToken = { 
        username : user.username,
        id: user._id,
      }

      return {value: jwt.sign(userForToken, jwt_secret)}; 
    }
  },

  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), jwt_secret)
      const currentUser = await User.findOne(decodedToken.username)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})