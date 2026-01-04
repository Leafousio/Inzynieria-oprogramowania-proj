import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'


const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete api.defaults.headers.common['Authorization']
}


api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // ensure header removed if no token
      if (config.headers) delete config.headers.Authorization;
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));


api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      try { localStorage.removeItem("token"); } catch (e) {}
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
export { api };