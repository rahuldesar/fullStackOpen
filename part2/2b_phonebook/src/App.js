import { useState, useEffect } from 'react';
import HandleFilter from './components/HandleFilter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import phonebook from './services/phonebook';
import Notification from './components/Notification';
import './index.css';


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState([]);
  let effect = () =>{
    phonebook.getAll()
    .then(response =>{
      setPersons(response.data);
    })
  }
  useEffect(effect, []);  

  let changeNewName = (event) =>{
    setNewName(event.target.value);
  }

  let changePhoneNumber = (event) =>{
    setPhoneNumber(event.target.value);
  }

  let handleFilter = (event) =>{
    let newPersons = persons.filter(person => 
      person.name.toLowerCase().includes((event.target.value).toLowerCase()));
    setPersons(newPersons);
  }
  
  let addName = (event) => {
    event.preventDefault();
    let newNameObj ={
      'name' : newName,
      'number' : phoneNumber,
    }

    let duplicateName = persons.filter((person) => (person.name === newNameObj.name));
    if(duplicateName.length > 0 ){
      if(window.confirm(`${newName} is already on Phonebook. Replace Old Number with New one?`)){
        newNameObj.id = duplicateName[0].id;
        phonebook.update(newNameObj.id, newNameObj)
        .then(response =>{
          alert(`Contact of ${newNameObj.name} updated`)
        });
        let tempPersons = JSON.parse(JSON.stringify(persons));
        tempPersons.forEach( person => {
          console.log(person , newNameObj);
          if(person.name === newNameObj.name){
          person.number = newNameObj.number;
        }
        });
        setPersons(tempPersons);
      } 
    }else {
      phonebook.create(newNameObj)
      .then(response =>
        {
          console.log(`${response.data.name} added`)
          newNameObj.id = response.data.id;
          setPersons (persons.concat(newNameObj));
          setNotification(
            [`${newNameObj.name} added`,'success']
          )
        })
      .catch(error =>{
        console.log(error.response.data.error);
        setNotification(
          [`${error.response.data.error}`,'fail']
        )
      }
        )
      
      setTimeout(() => {
        setNotification([])
      }, 5000)
      }
    }

  let deleteData = (id) => {
    const person = persons.find(n => n.id === id)
    const deleteNote = { ...person}
    let tempName = deleteNote.name;
    if (window.confirm(`DELETE ${tempName}`)) {
      phonebook.remove(deleteNote.id)
      .then(response =>
        alert(`${tempName} removed`)
      )
      .catch(error => {
        setNotification([`Note '${tempName}' was already removed from server`,'fail']) 
        setTimeout(() => {
          setNotification([])
        }, 5000)})
      let tempPersons = persons.filter(person => person.id !== id);
      setPersons(tempPersons);
    } 

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <HandleFilter handleFilter = { handleFilter }/>
      <h2>Add a new</h2>
      <PersonForm newName = {newName} changeNewName = {changeNewName}
        changePhoneNumber = {changePhoneNumber} addName = {addName} />
      <h2>Numbers</h2>
      <Persons persons= {persons} deleteName = {deleteData}/>
    </div>
  )
}
export default App;