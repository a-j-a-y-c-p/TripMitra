import axios from 'axios';


const baseURL = "http://localhost:8910";

const authAxios = axios.create({
    baseURL: baseURL,
    headers: {"ngrok-skip-browser-warning":"true"},

});

authAxios.interceptors.request.use((config) => {
    const publicEndpoints = ['/signup', '/login'];
    const isPublic = publicEndpoints.some((url) => config.url.includes(url));

    if (!isPublic) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  return config;
});

export default authAxios;