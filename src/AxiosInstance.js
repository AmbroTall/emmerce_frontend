import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://emmerce.pythonanywhere.com/crm", // Replace with your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
