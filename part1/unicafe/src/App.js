import { useState } from "react";



const Button = (props) => (
  <button className="btn" onClick={props.handleClick}> {props.text}</button>
)

const Header = ({ heading }) => (
  <h1>{heading}</h1>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = (props) => {
  if(props.statArr[3] == 0){
    return(
      <div> No Feedback Given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text = "good" value = {props.statArr[0]} />
          <StatisticLine text = "neutral" value = {props.statArr[1]} />
          <StatisticLine text = "bad" value = {props.statArr[2]} />
          <StatisticLine text = "total" value = {props.statArr[3]} />
          <StatisticLine text = "average" value = {props.statArr[4]} />
          <StatisticLine text = "positive" value = {props.statArr[5]} />
        </tbody>
      </table>
    )
  }
}


const App = () => { 
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  let total = good + bad + neutral;
  let average = (good - bad)/total;
  let positivePercentage = (good/total) * 100 +' %';
  let statArr = [good, neutral, bad, total, average, positivePercentage];
  let heading1 = "Give Feedback";
  let heading2 =  "Statistics";
  return(
    <div>
      <Header heading = { heading1 } />
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text = "bad" />
      <Header heading = { heading2 } />
      <Statistics statArr = {statArr}/>
      
    </div>
  )
}

export default App;