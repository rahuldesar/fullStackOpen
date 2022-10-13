// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = (props : {name : string}) => {

  return(
    <h1>
      {props.name}
    </h1>
  )
}

export default Header;