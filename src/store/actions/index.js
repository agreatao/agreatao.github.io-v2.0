import {
    BROWSER_RESIZE,
    BROWSER_SCROLL,
    GET_ISSUES,
    GET_ISSUES_ERROR,
    BG_SHOW,
    BG_HIDE
} from '../actionTypes';

import http from 'lib/http';
import config from 'config';

export const browserResize = payload => ({ type: BROWSER_RESIZE, payload });
export const browserScroll = payload => ({ type: BROWSER_SCROLL, payload });

export const getIssues = payload => ({ type: GET_ISSUES, payload });
export const getIssuesError = payload => ({ type: GET_ISSUES_ERROR, payload });
export const receiveIssues = () => (dispatch, getState) => {
    let state = getState();
    if(!state || !state.issues || !state.issues.data || !state.issues.data.length) {
        return http.get(`/issues?creator=${config.owner}&per_page=1000&access_token=${config.token}`)
            .then(result => {
                dispatch(getIssues({data: result}));
                return result;
            })
            .catch(e => {
                dispatch(getIssuesError({error: "网络链接失败啦，请检查网络是否正常"}));
                throw e;
            });
    } else {
        return Promise.resolve(getState().issues.data);
    }
}

export const bgShow = () => ({ type: BG_SHOW });
export const bgHide = () => ({ type: BG_HIDE });

export const bgToggle = () => (dispatch, getState) => {
    let state = getState();
    if(state && state.bg && state.bg.show) {
        dispatch(bgHide());
    } else {
        dispatch(bgShow());
    }
}