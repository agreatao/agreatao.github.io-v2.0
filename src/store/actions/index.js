import {
    BROWSER_RESIZE,
    BROWSER_SCROLL,
    APP_BG_SHOW,
    APP_BG_HIDE,
    RECEIVE_USER,
    RECEIVE_USER_ERROR
} from '../actionTypes';

import { getUserByAuth } from 'api';

export const browserResize = payload => ({ type: BROWSER_RESIZE, payload });
export const browserScroll = payload => ({ type: BROWSER_SCROLL, payload });

export const bgShow = () => ({ type: APP_BG_SHOW });
export const bgHide = () => ({ type: APP_BG_HIDE });
export const bgToggle = () => (dispatch, getState) => {
    let state = getState();
    if(state && state.app && state.app.appBgShow) {
        dispatch(bgHide());
    } else {
        dispatch(bgShow());
    }
}

import { urlParser } from 'lib/utils';
import http from 'lib/http';
import Cookies from 'js-cookie';

export const receiveUser = (payload) => ({ type: RECEIVE_USER, payload })
export const receiveUserError = (payload) => ({ type: RECEIVE_USER_ERROR, payload })
export const readCookieUser = () => (dispatch, getState) => {
    const state = getState();
    if(state && state.user && state.user.data) return;
    let token = Cookies.get("token");
    if(token) {
        return http.get("https://api.github.com/user?access_token=" + token)
            .then(result => {
                dispatch(receiveUser({ ...result, token }));
                return { ...result, token }
            })
            .catch(error => {
                dispatch(receiveUserError('未能成功获取用户'));
                throw error;
            })
    } else {
        dispatch(receiveUserError('未能成功获取用户'));
    }
}