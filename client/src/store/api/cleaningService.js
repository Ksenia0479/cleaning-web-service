import axios from "axios";

const cleaningServiceAPI = axios.create({
  baseURL: `https://cleaning-web-service-server.vercel.app`,
});

export { cleaningServiceAPI };
