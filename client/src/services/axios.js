import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_VERCEL_SERVER_URL}`,
});

export const isAxiosError = axios.isAxiosError;
export default instance;
