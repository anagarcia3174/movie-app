import axios from "axios";

const instance = axios.create({
  baseURL: "https://movie-app-server-miyf2ixt5-anas-projects-93313cc1.vercel.app/",
});

export default instance;
