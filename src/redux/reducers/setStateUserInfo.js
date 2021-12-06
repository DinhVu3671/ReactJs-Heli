import { ActionTypes } from "../contants/action-type";

const initialState = {
    userInfo : [],
}

const setStateUserInfo = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo, 
              };
        default:
            return state;
    }
};

export default setStateUserInfo;