import Axios from "axios";

const axiosInstance = Axios.create({
  // Configuring a base URL if needed
  // baseURL: 'http://example.com/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const usertoken = localStorage.getItem("userToken");
    if (usertoken) {
      config.headers.Authorization = usertoken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
axiosInstance.defaults.headers.get["Content-Type"] = "application/json";

export default axiosInstance;
