import { ActionTypes } from "../contants/action-type";

const initialState = {
    isLogin: false,
}

const setStateLogin = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_STATE_LOGIN:
            return {
                ...state,
                isLogin: action.isLogin,  
              };
        default:
            return state;
    }
};

export default setStateLogin;