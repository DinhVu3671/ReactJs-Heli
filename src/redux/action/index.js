// defining the action creators
import { ActionTypes } from "../contants/action-type";

export const stateLogin = (isLogin) => ({
    type: ActionTypes.SET_STATE_LOGIN,
    isLogin,
});

export const setStateUserInfo = (userInfo) => ({
    type: ActionTypes.SET_USER_INFO,
    userInfo,
});

export const setStatePagingTable = (paging) => ({
    type: ActionTypes.SET_STATE_PAGING,
    paging,
});
export const setUserData = (userData) => ({
    type: ActionTypes.SET_USER_DATA,
    userData,
});