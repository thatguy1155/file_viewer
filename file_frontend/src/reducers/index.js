import { combineReducers } from 'redux'
import directoryReducer from './directoryReducer'
import modalReducer from './modalReducer'




//send all the reducers back to the store
export default combineReducers({
    directory: directoryReducer,
    modal:modalReducer
    
})