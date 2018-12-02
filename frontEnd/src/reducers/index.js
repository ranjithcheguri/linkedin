//This is rootReducer
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import jobDisplayReducer from './JobDisplayReducer';

import applicationReducer from './applicationReducer';
import messagesReducer from './messagesReducer';

//Reducer, just combines all the states.
export default combineReducers({
    loginState: loginReducer,
    jobDisplay: jobDisplayReducer,
    applicationState : applicationReducer,
    messagesState : messagesReducer,
});