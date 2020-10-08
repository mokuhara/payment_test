import axios from "axios";
const BASEURL = "http://localhost:3001";

const actions = {
    async request({
        dispatch,
        rootState
    }, {
        method,
        url,
        data,
        error
    }) {
        const headers = {};
        headers["Content-Type"] = "application/json";
        if (rootState.auth.token) {
            headers["Authorization"] = `Token ${rootState.auth.token}`;
            headers["User-Id"] = rootState.auth.userId;
        }

        const options = {
            method,
            url: `${BASEURL}${url}`,
            // url: `${process.env.API_URL}${url}`,
            headers,
            data,
            timeout: 15000,
        };

        return axios(options)
            .then((res) => res)
            .catch((err) => {
                dispatch(
                    "message/create", {
                        error: error,
                        err,
                    }, {
                        root: true,
                    }
                );
            });
    },
    async post({
        dispatch
    }, requests) {
        requests.method = "post";
        return dispatch("request", requests);
    },
    async delete({
        dispatch
    }, requests) {
        requests.method = "delete";
        return dispatch("request", requests);
    },
    async patch({
        dispatch
    }, requests) {
        requests.method = "patch";
        return dispatch("request", requests);
    },
    async get({
        dispatch
    }, requests) {
        requests.method = "get";
        return dispatch("request", requests);
    }
};

export default {
    namespaced: true,
    actions,
};