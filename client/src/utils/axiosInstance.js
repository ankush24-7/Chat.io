import axios from "axios";
import authAPI from "@/services/api/authAPI";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "https://chat-io-backend-jhed.onrender.com"
    : "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const base = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "https://chat-io-backend-jhed.onrender.com"
    : "http://localhost:3000",
  withCredentials: true,
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { accessToken } = await authAPI.refresh();
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        processQueue(null, { accessToken });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.log("Refresh failed:", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
