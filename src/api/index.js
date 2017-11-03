import Q from 'q';
import axios from 'axios';
axios.defaults.withCredentials = true
export default (url, method = 'get', data, headers) => {
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
        timeout: 30000,
        withCredentials: true
    })
};
