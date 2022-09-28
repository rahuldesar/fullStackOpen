import {useState} from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from "react-router-dom";
import { useField } from './hooks';


const Menu = () => {
  const padding = {
    padding: 5
  }
  return (
    <div>
      <Link style={padding} to={'/'}> anecdotes </Link>
      <Link style={padding} to={'/create'}> create new </Link>
      <Link style={padding} to={'/about'}> about </Link>
    </div>
  )
}

const AnecdoteDetail = ({ anecdote }) =>{
  return(
    <>
      <h3>{anecdote.content}</h3>
      <div>has {anecdote.votes} votes </div>
      <div>
        <span>for more info see : </span>
        <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>
    )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{"marginTop": 20,'padding': 15  , "backgroundColor" : 'rgb(220,220,220)'}} >
    <div>Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.</div>
    <div>See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.</div>
  </div>
)

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({ content : content.value , author: author.value, info: info.value });
    navigate('/');
  }
  
  const resetSubmit = (e) => {
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content } reset=''/>
        </div>
        <div>
          author
          <input {...author } reset=''/>

        </div>
        <div>
          url for more info
          <input {...info } reset=''/>

        </div>
        <button type='submit'>create</button>
      </form>
      <button onClick={ resetSubmit }> reset </button>

    </div>
  )

}

const NotificationComp = ({notification}) => {
  return(
    <div>
      {notification}
    </div>
  )
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('');

  console.log("notification", notification);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setNotification(`A new anecdote : ${anecdote.content} - CREATED `);
    setAnecdotes(anecdotes.concat(anecdote));

    setTimeout(() => {
      setNotification('');
    }, 5000) ;
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id');
  const anecdote = match? anecdoteById(Number(match.params.id)): null;


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <NotificationComp notification={notification}/>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />  
        <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdote={anecdote} />} />  
        <Route path="/about" element={<About />} />  
        <Route path="/create" element={<CreateNew addNew={addNew} />} />  
        <Route path="/home" element={<Navigate replace to="/"/>} />  

      </Routes>
      <Footer />
    </div>
  )
}

export default App
