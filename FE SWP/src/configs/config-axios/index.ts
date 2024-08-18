import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5105",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response ) => {
    if ((response.status === 200 || response.status === 201)&& response.data) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return console.log("401 - Unauthorized")
    } else if (error.response && error.response.status === 403) {
      return console.log("403 - Forbidden")
    }
    else if (error.response && error.response.status === 404) {
      return console.log("404 - Not found")
    } else if (error.response && error.response.status === 500) {
      return console.log("500 - Internal server error")
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;