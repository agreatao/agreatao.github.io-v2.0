import { BG_HIDE, BG_SHOW } from '../actionTypes';

export default function browser(state = {
    show: false
}, { type }) {
    switch(type) {
        case BG_SHOW: return { show: true };
        case BG_HIDE: return { show: false };
        default: return state;
    }
}
