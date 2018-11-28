import axios from 'axios';
import config from 'config';

if(config.request)
    axios.defaults.baseURL = config.request;

let http = {};

['get', 'post'].forEach(method => {
    http[method] = (...args) => axios[method](...args).then(response => {
        if(response.status == 200 || response.status == 201) {
            return response.data;
        } else {
            throw "网络链接不上啦，快去检查一下";
        }
    }).catch(e => {
        throw e;
    })
});

module.exports = http;