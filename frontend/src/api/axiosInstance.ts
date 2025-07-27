import axios, {isAxiosError} from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export {isAxiosError}
export default axiosInstance;
