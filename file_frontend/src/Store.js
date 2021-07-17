import { createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'  //because the file in reducers is called index.js in can be called here as Root Reducer

const initialState = {};

const middleware = [thunk]
//create the store, incorporate the state and the reducers
const Store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        ))

export default Store