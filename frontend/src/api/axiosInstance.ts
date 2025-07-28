import axios, {isAxiosError} from "axios";

const axiosInstance = axios.create({
  baseURL: "https://case-study-backend-556z.onrender.com", //Hard coded upon confirming with the interviewer
  headers: {
    "Content-Type": "application/json"
  }
});

export {isAxiosError}
export default axiosInstance;
