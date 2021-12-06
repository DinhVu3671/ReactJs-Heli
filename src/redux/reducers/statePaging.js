import { ActionTypes } from "../contants/action-type";

const initialState = {
    paging : {
        page: 1,
        size: 100,
        totalPage: 1,
        totalRecord: 1,
        sortKey: "",
        sortDir: ""
    },
}

const setStatePaging = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_STATE_PAGING:
            return {
                ...state,
                paging: action.paging,  
              };
        default:
            return state;
    }
};

export default setStatePaging;