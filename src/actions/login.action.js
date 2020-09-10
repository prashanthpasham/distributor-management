import { userConstants } from '../constants/user.constants';

export const loginActions = {
    login
}
function login(username, password) {
 return dispatch=>{
     dispatch({type:userConstants.SPINNER,payload:'true'})
 }
}