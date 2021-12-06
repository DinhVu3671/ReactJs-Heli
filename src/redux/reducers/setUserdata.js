import { ActionTypes } from "../contants/action-type";

const initialState = {
    userData : [],
}

const setUserData = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER_DATA:
            return {
                ...state,
                userData: action.userData,  
              };
        default:
            return state;
    }
};

export default setUserData;