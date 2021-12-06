import axios from 'axios';


const callAPI = axios.create({
    baseURL: 'https://dev.airead-cloud.com/api/v1/',
    headers: {
        'Accept-Language': 'jp,en'
    }
})
export default callAPI;