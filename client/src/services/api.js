import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://eventmanagementplatformserverpoint.onrender.com/api',
});

export default axiosInstance;
