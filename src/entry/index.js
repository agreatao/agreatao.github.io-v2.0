import 'theme/index.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store';
import router from 'router';

import 'lib/browser';

import http from 'lib/http';
import { urlParser } from 'lib/utils';

import Cookies from 'js-cookie';


const hrefReplace = () => {
    return new Promise((resolve, reject) => {
        const { origin, hash, query } = urlParser();
        if (query && query.code) {
            http.get("https://github.com/login/oauth/access_token", {
                params: {
                    client_id: '3b94ec6434f646b1f439',
                    client_secret: '51f9e4d2c90122145b6b313f52b5c97fe0c93cc9',
                    code: query.code
                },
                headers: {
                    'Accept': "application/json"
                }
            }).then(result => {
                if(result && result.access_token) {
                    Cookies.set("token", result.access_token);
                    window.location = origin + hash; 
                    reject();
                } else {

                }            
            }).catch(e => {
                window.location = origin + hash;
                reject();
            })
        } else {
            resolve()
        }
    })
}

hrefReplace()
    .then(() => {
        render(
            (
                <Provider store={store}>
                    {router}
                </Provider>
            ),
            document.getElementById('app')
        );
    })
    .catch(e => {
        console.log(e);
    });