import { loginReducer } from './login.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    loginReducer
});
export default rootReducer;