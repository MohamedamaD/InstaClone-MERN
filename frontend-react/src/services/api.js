import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// set access token for each request
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          const response = api.post("api/v1/users/refresh-token");
          sessionStorage.setItem("accessToken", response.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("No refresh token found");
        }
      } catch (err) {
        console.error("Unable to refresh token:", err);
        sessionStorage.removeItem("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
