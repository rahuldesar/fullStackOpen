import { useState, useEffect } from 'react'
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('')
  console.log("🚀 ~ file: App.js ~ line 6 ~ useField ~ value", value)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log("🚀 ~ file: App.js ~ line 20 ~ useCountry ~ country", country)
  console.log("--------------------------------------------------------");
  let effect = () => {
    let url =`https://restcountries.com/v3.1/name/${name}?fullText=true`;
    axios.get(url).then(result => result.data)
      .then(detail => setCountry(detail[0]))
      .catch( error => setCountry(null));
  }
  useEffect(effect ,[name]);

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  console.log("🚀 ~ file: App.js ~ line 52 ~ App ~ name", name)
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
