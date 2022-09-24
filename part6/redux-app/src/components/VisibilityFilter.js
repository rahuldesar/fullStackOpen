import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = ( ) => {
  const dispatch = useDispatch();

  return (
    <div>
      ALL
      <input type="radio" name="filterImportant" id="" 
        onClick={() => dispatch(filterChange('ALL'))}/>
      IMPORTANT
      <input type="radio" name="filterImportant" id="" 
        onClick={() => dispatch(filterChange('IMPORTANT'))}/>
      NOT IMPORTANT
      <input type="radio" name="filterImportant" id="" 
        onClick={() => dispatch(filterChange('NOT IMPORTANT'))}/>
    </div>
  )
}

export default VisibilityFilter;