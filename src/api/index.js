import Q from 'q';
import axios from 'axios';

export default (url, method = 'get', data) => {
    var deferred = Q.defer();
    axios({
        method: method,
        url: url,
        data: data,
        timeout: 30000
    }).then(res => {
        if (res.data && res.data.success) {
            deferred.resolve(res.data);
        } else {
            switch (res.data.code) {
                case '000010':
                    window.location.href = '/login.html';
                    break;
            }
            deferred.reject(res.data);
        }
    }, err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 401:
                    window.location.href = '/login.html';
                    break;
                default:
                    deferred.reject(err);
                    break;
            }
        } else {
            deferred.reject(err);
        }
    });
    return deferred.promise;
};
