import axios from "axios";
import { notification } from "antd";

export const mocksApi = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_API
});

export const mockFetcher = (resource: string) =>
  mocksApi.get(resource).then(res => res.data.content);

export const apiFetcher = (resource: string) =>
  api.get(resource).then(res => res.data.content);

api.interceptors.request.use(
  function(config) {
    const token = window.localStorage.getItem("auth.token");
    if (!token) return config;
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  },
  function(error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if ([401].includes(error.response.code)) {
      // TODO: status code menyesuaikan BE
      window.location.replace("/logout");
      return Promise.reject(error);
    }
    notification.error({
      message: "Something Went Wrong!",
      description: JSON.stringify(error) // TODO: mapping error mengikuti BE
    });
    return Promise.reject(error);
  }
);

mocksApi.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    notification.error({
      message: "Something Went Wrong!",
      description: JSON.stringify(error.message) // TODO: mapping error mengikuti BE
    });
    return Promise.reject(error);
  }
);
