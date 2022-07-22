import axios from "axios";
import { resetSession } from "../utils/session";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      resetSession();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
