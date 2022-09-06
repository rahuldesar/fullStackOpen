const Form = ({filterCountries}) =>(<form>
  Find Countries : 
  <input type="text" onChange={filterCountries} />
</form>
)

export default Form;