const PersonForm = ({newName , changeNewName, changePhoneNumber, addName}) => (
  <form>
  <div>
    name: <input value = { newName } onChange ={changeNewName}/>
  </div>
  <div>
    number: <input  onChange = {changePhoneNumber}/>
  </div>
  <div>
    <button onClick = { addName } type="submit">add</button>
  </div>
</form>
)

export default PersonForm;