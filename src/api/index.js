import Q from 'q';
import axios from 'axios';

axios.defaults.withCredentials = true
export default (url, method = 'get', data) => {
    var deferred = Q.defer();
    axios({
        method: method,
        url: url,
        data: data,
        timeout: 30000
    }).then(res => {
        deferred.resolve(res.data);
    }, err => {
        deferred.reject(err);
    });
    return deferred.promise;
};
