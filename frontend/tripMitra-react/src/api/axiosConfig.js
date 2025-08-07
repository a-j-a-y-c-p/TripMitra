import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

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