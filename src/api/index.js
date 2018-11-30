import http from "lib/http";

import { Base64 } from "js-base64";
import config from "config";

export const listIssues = () => {
    return http.get("/issues", {
        params: {
            creator: config.owner,
            page: 1,
            per_page: 1000,
            access_token: config.token,
            labels: ""
        }
    });
};

export const getIssue = id => {
    return http.get(`/issues/${id}`, {
        params: {
            access_token: config.token
        }
    });
};

export const listComments = id => {
    return http.get(`/issues/${id}/comments`, {
        params: {
            access_token: config.token
        }
    });
};
