//This is rootReducer
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import applicationReducer from './applicationReducer';
import messagesReducer from './messagesReducer';

//Reducer, just combines all the states.
export default combineReducers({
    loginState: loginReducer,
    applicationState : applicationReducer,
    messagesState : messagesReducer,
});