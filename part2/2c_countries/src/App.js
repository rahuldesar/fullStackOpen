import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form'
import ShowCountries from './components/ShowCountries';


const App = () =>{
  const[countries, setCountries] = useState([]);
  const[countriesToShow, setCountriesToShow] = useState([]);
  const[loading, setLoading] = useState(true);
  let effect = () =>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
      setLoading(false);
    })
  }
  useEffect(effect , []);
  
  
  // console.log(countries);

  let filterCountries = (event) => {
    // console.log(event.target.value);
    let countriesList = countries.filter(country => country.name.common.toLowerCase().includes((event.target.value).toLowerCase()));
    setCountriesToShow(countriesList);
  }
  if(loading) {
    return (
      <>
      <div> Loading Countries List ...</div>
      <div> It will only take few seconds.</div>
      </>
    )
  } else {
  return(
  <div>
    <Form filterCountries = {filterCountries}/>
    <ShowCountries key = {countriesToShow.length} countries = {countriesToShow} />
  </div>
)}

}
export default App;