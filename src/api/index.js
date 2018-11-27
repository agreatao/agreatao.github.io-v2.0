import http from 'lib/http';

import { Base64 } from 'js-base64';
import config from 'config';

export const listIssues = () => {
    return http.get("/issues", {
        params: {
            creator: config.owner,
            page: 1,
            per_page: 1000,
            access_token: config.token
        }
    });
}

export const getIssue = (id) => {
    return http.get(`/issues/${id}`, {
        params: {
            access_token: config.token
        }
    });
}

export const listComments = (id) => {
    return http.get(`/issues/${id}/comments`, {
        params: {
            access_token: config.token
        }
    })
}

export const createComment = (id, comments, aut) => {
    return http.post(`/issues/${id}/comments`, {
        body: comments
    }, {
        headers: {
            Authorization: "Basic " + Base64.encode(`${aut.username}:${aut.password}`)
        }
    })
}

export const getUser = (username, password) => {
    return http.get("/user", {
        headers: {
            Authorization: "Basic " + Base64.encode(`${aut.username}:${aut.password}`)
        }
    })
}

export const getUserByAuth = (auth) => {
    return http.get("http://api.github.com/user", {
        headers: {
            Authorization: "Basic " + auth
        }
    })
}