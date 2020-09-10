import { userConstants } from '../constants/user.constants';
export const loginReducer = (state = { spinner: 'false' }, action) => {
    switch (action.type) {
        case userConstants.SPINNER:
            return {
                spinner: action.payload
            };
        default:
            return state;
    }
}

