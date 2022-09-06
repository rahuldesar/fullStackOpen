import ShowLanguage from "../ShowLanguage";
import WeatherStackAPI from "../WeatherStackAPI";
const ShowCountryDetails = ({country}) => {



  // console.log(props);
  return (
    <>
    <h2>{country.name.common}</h2>
    <p>Capital : {country.capital}</p>
    <p>Area : {country.area}</p>
    <ShowLanguage country = {country} />
    <img src={country.flags.png} alt={country.name.common} />
    <WeatherStackAPI country = {country} />
    </>
  )
}

export default ShowCountryDetails;