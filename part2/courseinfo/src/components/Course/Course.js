const Course =  (props) => {
  console.log('Course props', props);
  
    return(
      <div> 
      <Header course = {props.course} />
      <Content parts = {props.course.parts} />
      <Total parts = {props.course.parts} />
      </div>  
    )
  } 
  
  const Header = (props) => {
  console.log('Header props', props)
  return (
    <>
    <h1> {props.course.name} </h1>
    </>
  )
  }
  
  const Content = ({ parts }) => {
  console.log('parts', parts);
  
  return(
    <ul>
      {parts.map(part => 
        <Part key= {part.id} part = {part}/>) }
    </ul>
  )
  }
  
  
  const Part = (props) => (
    <ul id = {props.part.id}>
    {props.part.name} {props.part.exercises}
    </ul>
    )
  
  const Total = (props) => {
    let total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log(props,'++++++' , total);
    return(
    <ul> total of {total} exercises</ul>
    )
  }

  export default Course;