import axios from "axios";

const api = axios.create({
  baseURL: "https://grandegyptianmuseum1.runasp.net",
});

// هذا الجزء بيلزق التوكن في أي طلب رايح للباك إند
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
