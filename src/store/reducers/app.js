import { APP_BG_HIDE, APP_BG_SHOW } from "../actionTypes";

export default function browser(
    state = {
        appBgShow: true
    },
    { type }
) {
    if(state.appBgShow) {
        document.getElementById("app").className = "show-bg";
    } else {
        document.getElementById("app").className = "";
    }
    switch (type) {
        case APP_BG_SHOW: {
            document.getElementById("app").className = "show-bg";
            return { appBgShow: true };
        }
        case APP_BG_HIDE: {
            document.getElementById("app").className = "";
            return { appBgShow: false };
        }
        default:
            return state;
    }
}
