let ShowLanguage = ({ country }) => {
  console.log(country);
  return (
    <ul>
      <h3> Languages</h3>
      {
        Object.keys(country.languages).map((key, i) => (
          <li key={i}>
            <span>{key} : </span>
            <span>{country.languages[key]}</span>
          </li>
        )
      )}
    </ul>
  )
}


export default ShowLanguage;
