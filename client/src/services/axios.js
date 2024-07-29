import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.248:3030",
});

export default instance;
