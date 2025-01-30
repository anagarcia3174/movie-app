import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_VERCEL_SERVER_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const isAxiosError = axios.isAxiosError;
export default instance;
