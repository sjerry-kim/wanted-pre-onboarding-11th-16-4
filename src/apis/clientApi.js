import axios from "axios";
import { BASE_URL } from "../constants/config";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default client;
