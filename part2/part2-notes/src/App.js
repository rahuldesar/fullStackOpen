import { useState } from 'react';
import HandleFilter from './components/HandleFilter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {


  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  
  let changeNewName = (event) =>{
    setNewName(event.target.value);
  }

  let changePhoneNumber = (event) =>{
    setPhoneNumber(event.target.value);
  }

  let handleFilter = (event) =>{
    console.log(event.target.value);
    let newPersons = persons.filter(person => person.name.includes(event.target.value));
    console.log('newPersons : ', newPersons);
    setPersons(newPersons);
  }
  
  let addName = (event) => {
    event.preventDefault();
    let newNameObj ={
      'name' : newName,
      'number' : phoneNumber,
    }
   
    let duplicateName = persons.filter((person) => (person.name === newNameObj.name));
    console.log(duplicateName , newNameObj.name);
    // let total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    if(duplicateName.length > 0 ){
      alert(`${newName} is already on Phonebook. Duplicate detected`);
      duplicateName = [];
    }else {
      setPersons(persons.concat(newNameObj));

    }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <HandleFilter handleFilter = { handleFilter }/>
      <h2>Add a new</h2>
      <PersonForm newName = {newName} changeNewName = {changeNewName}
        changePhoneNumber = {changePhoneNumber} addName = {addName} />
      <h2>Numbers</h2>
      <Persons persons= {persons} />
    </div>
  )
}

export default App;