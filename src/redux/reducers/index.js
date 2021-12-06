import { combineReducers } from 'redux';
import setStateLogin from './stateLogin';
import setStateUserInfo from './setStateUserInfo';
import setStatePaging from './statePaging';
import setUserData from './setUserdata';

const rootReducer = combineReducers({
    stateLogin: setStateLogin,
    setStateUserInfo,
    setStatePaging,
    setUserData,
})
export default rootReducer; 