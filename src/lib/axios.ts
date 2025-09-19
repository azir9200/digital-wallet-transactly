import config from "@/config";
import axios from "axios";
import { store } from "@/redux/store";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   function (config) {

//     console.log("Axios", config);
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Axios request:", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    console.log("Axios response:", response);
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);
