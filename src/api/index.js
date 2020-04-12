import Q from 'q';
import axios from 'axios';
axios.defaults.withCredentials = true
export default (url, method = 'get', data, headers) => {
    console.log("data:",data);
    return axios({
        withCredentials: false,
        crossDomain: true,
        // xhrFields: {withCredentials: false},
        method: method,
        headers: headers,
        url: url,
        data: data,
        timeout: 30000,
    })
};
