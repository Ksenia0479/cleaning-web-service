import axios from "axios";

const cleaningServiceAPI = axios.create({
  baseURL: `http://localhost:4000`,
});

export { cleaningServiceAPI };
