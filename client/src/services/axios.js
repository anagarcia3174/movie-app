import axios from "axios";

const instance = axios.create({
  baseURL: "https://movie-app-server-wine.vercel.app",
});

export default instance;
