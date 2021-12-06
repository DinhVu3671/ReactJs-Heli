import axios from 'axios';
import callAPI from './index';



function UserAPI() {

    // [GET] /users/user-info
    this.getUserInfo = (sessionId) => {
        return callAPI.get('users/user-info', { headers: { sessionId } });
    }

    // [GET] /users
    this.getAllUsers = (sessionId, page = 1, size = 100, sortKey = null, sortDir = null) => {
        return callAPI.get('users', { headers: { sessionId }, params: { page, size, sortKey, sortDir } })
    }

    // [POST] /users
    this.createNewUser = (sessionId, data, force = false) => {
        return callAPI.post('users/',{ data, headers: { 'Accept': 'application/json', sessionId },  params: { force }})
    }

    // [DELETE] /users/:user_id
    this.deleteUser = (sessionId, user_id) => {
        return callAPI.delete(`users/${user_id}/`, { headers: { sessionId } })
    }
}
export default new UserAPI();
