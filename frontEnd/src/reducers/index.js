//This is rootReducer
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import jobDisplayReducer from './JobDisplayReducer';


//Reducer, just combines all the states.
export default combineReducers({
    loginState: loginReducer,
    jobDisplay: jobDisplayReducer
});