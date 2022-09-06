import ShowCountryDetails from "../ShowCountryDetails";
import { useState } from "react";

const SingleCountry = ({country}) => {
  const [isVisible , setIsVisible] = useState(false);
  let toggleDetails = (event) =>{
    setIsVisible(!isVisible);
  }
  

  if(isVisible){
    return(
    <li>
    {country.name.common}   
    <button onClick={toggleDetails}> hide </button>
    <ShowCountryDetails country = {country} />
    </li>
    )
  }
  else

  return (
  <li> 
    {country.name.common}   
    <button onClick = {toggleDetails} > show </button>
  </li>
  )}


  export default SingleCountry;