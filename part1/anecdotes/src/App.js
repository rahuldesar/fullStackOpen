import { useState } from "react"

const Button = (props) => {
  return (
    <button onClick= {props.handleClick}> {props.text} </button>
  )
}  

const ShowAnecdote = ({ anecdotes , selected }) =>(
  <div> {anecdotes[selected]}</div>
)

const ShowVote = ({ votes , selected}) => (
  <div> has {votes[selected]} votes</div>
)



const App = () => {
  const [selected, setSelected] = useState(0);
  let anecdotes =[
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];
  let [votes , setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  let btnText = 'next Anecdote';
  let btnVoteText = "VOTE"
  
  let handleClick = () =>{
    let temp = Math.floor(Math.random()* anecdotes.length);
    console.log("Selected ", temp);
    setSelected(temp);
  
  }

  let handleClickVotes = () => { 
    let tempArr = [...votes];
    tempArr[selected] += 1;
    console.log("tempArr" , tempArr);
    setVotes( tempArr);
  }

  const Title = ({titleText}) =>(
    <h1 > {titleText}</h1>
  )

  let title1 = " Anecdote of the day";
  let title2 = "Anecdote with most votes";
  
  let ShowMostVotesAnecdote = () =>{
    let temp = [...votes];
    let max = temp.indexOf(Math.max(...temp));
    if(Math.max(...temp) == 0 ){
      return (
        <div> NO VOTES DETECTED</div>
      )
    } else {
    return (
      <div>{anecdotes[max]}</div>
    )}
  }  
  return (
    <>
  <Title titleText = {title1} />
  <ShowAnecdote anecdotes = { anecdotes } selected = {selected} />
  <ShowVote votes = {votes} selected = {selected} />
  <Button handleClick = {handleClickVotes} text = {btnVoteText} />
  <Button handleClick = {handleClick}  text = {btnText} />
  
  <Title titleText = {title2} />
  <ShowMostVotesAnecdote votes = {votes} anecdotes = { anecdotes }/>

  
  </>
)}


export default App; 