import {
    BROWSER_RESIZE,
    BROWSER_SCROLL,
    APP_BG_SHOW,
    APP_BG_HIDE
} from '../actionTypes';

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