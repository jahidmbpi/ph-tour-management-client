import config from "@/config";
import axios from "axios";
export const axiousInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
axiousInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiousInstance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
