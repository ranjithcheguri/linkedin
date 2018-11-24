//This is rootReducer
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';



//Reducer, just combines all the states.
export default combineReducers({
    loginState: loginReducer,
 
});