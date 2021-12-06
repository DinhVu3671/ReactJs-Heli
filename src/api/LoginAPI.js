import axios from 'axios';
import callAPI from './index';


// login api
function LoginAPI() {

    // [POST] /logon
    this.login = (data) => {
        return callAPI.post('logon', data);
    }

    // [POST] /logoff
    this.logoff = (sessionId) => {
        return callAPI.post('logoff', { headers: { sessionId } });
    }
}

export default new LoginAPI();
      