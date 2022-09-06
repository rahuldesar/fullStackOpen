import ShowCountryDetails from "../ShowCountryDetails";
// import ShowLanguage from "../ShowLanguage";
import SingleCountry from "../SingleCountry";

const ShowCountries= ({ countries }) =>{
  if(countries.length > 10){
    // console.log(countries);
    return(
      <div>THERE ARE TOO MANY COUNTRIES. BE MORE SPECIFIC</div>
    )
  } 
  else if (countries.length === 1){

    return(
    <ShowCountryDetails country = {countries[0]} />
    )
  }
  else if (countries.length >1 && countries.length <= 10){
    // console.log(countries);
    return (
      <ul key = {countries.length}>
      {countries.map(country => 
        <SingleCountry country = {country} key = {country.area}/>) }
      </ul>
    )
  } 
  else {
    return(
      <div> NO COUNTRY FOUND</div>
    )
  }
}

export default ShowCountries;