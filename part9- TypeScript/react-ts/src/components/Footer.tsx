interface courseProps {
  name : string;
  exerciseCount: number;
}



const Footer = ( {courseParts} : {courseParts : courseProps[]}) => {

  return(
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}


export default Footer;