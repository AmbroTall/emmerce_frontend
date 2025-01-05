import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/crm", // Replace with your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
