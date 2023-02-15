import axios from "axios";
const BASE_URL = "http://i8a201.p.ssafy.io/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  proxy: {
    host: "127.0.0.1",
    port: 80,
  },
});

export default instance;
