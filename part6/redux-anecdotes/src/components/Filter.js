import { setFilter } from "../reducers/filterReducer"
// import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value);
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filterAnecdote' onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter);