import axios from 'axios';
import config from 'config';

if(config.request)
    axios.defaults.baseURL = config.request;

// axios.defaults.headers['X-RateLimit-Limit'] = 5000;
// axios.defaults.headers['X-RateLimit-Remaining'] = 4966;
// axios.defaults.headers['X-RateLimit-Reset'] = 1372700873;

let http = {};

['get', 'post'].forEach(method => {
    http[method] = (...args) => axios[method](...args).then(response => {
        if(response.status == 200) {
            return response.data;
        } else {
            throw "网络链接不上啦，快去检查一下";
        }
    }).catch(e => {
        throw e;
    })
});

module.exports = http;