import axios from "axios";
import { checkAndRefreshSession, signUserOut } from "./firebase";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_VERCEL_SERVER_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await checkAndRefreshSession();
        return instance(originalRequest);
      } catch (refreshError) {
        await signUserOut();
        throw refreshError;
      }
    }
    throw error;
  }
);

export const isAxiosError = axios.isAxiosError;
export default instance;
