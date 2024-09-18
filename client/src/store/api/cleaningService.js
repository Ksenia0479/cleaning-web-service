import axios from "axios";

const cleaningServiceAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export { cleaningServiceAPI };
