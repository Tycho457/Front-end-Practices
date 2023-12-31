import axios from "axios";

import {
    handleChangeRequestHeader,
    handleConfigureAuth,
    handleAuthError,
    handleGeneralError,
    handleNetworkError,
  } from "./tools";

axios.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config);
    config = handleConfigureAuth(config);
    return config;
})

axios.interceptors.response.use(
    (response) => {
      if (response.status !== 200) return Promise.reject(response.data);
      handleAuthError(response.data.errno);
      handleGeneralError(response.data.errno, response.data.errmsg);
      return response;
    },
    (err) => {
      handleNetworkError(err.response.status);
      return Promise.reject(err.response);
    }
);

export const GET = (url, param = {}, clearFn) =>
    new Promise((resolve) => {
        axios
        .get(url, {param})
        .then((result) => {
            let res;
            if(clearFn !== undefined) {
                res = clearFn(result.data);
            } else {
                res = result.data;
            }
            resolve([null, res]);
        })
        .catch((err) => {
            resolve([err, undefined]);
        });
})

export const Post = (url, data, params = {}) => {
    return new Promise((resolve) => {
      axios
        .post(url, data, { params })
        .then((result) => {
          resolve([null, result.data]);
        })
        .catch((err) => {
          resolve([err, undefined]);
        });
    });
  };