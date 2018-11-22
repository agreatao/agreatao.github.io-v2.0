import { GET_ISSUES, GET_ISSUES_ERROR  } from '../actionTypes';

export default function browser(state = {
    data: [],
    error: null,
}, { type, payload }) {
    switch(type) {
        case GET_ISSUES: return { ...state, ...payload };
        case GET_ISSUES_ERROR: return { ...state, ...payload };
        default: return state;
    }
}
