import { RECEIVE_USER, RECEIVE_USER_ERROR } from '../actionTypes';

export default function browser(state = {
    data: null,
    error: null
}, { type, payload }) {
    switch(type) {
        case RECEIVE_USER: return { ...state, data: payload };
        case RECEIVE_USER_ERROR: return { ...state, error: payload };
        default: return state;
    }
}
