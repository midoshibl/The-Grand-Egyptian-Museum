import api from "../api/api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/api/Auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // حفظ التوكن
      localStorage.setItem("user", JSON.stringify(response.data.user)); // حفظ بيانات المستخدم
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};
export const registerVisitor = async (userData) => {
  const response = await api.post("/api/Auth/register-visitor", userData);
  return response.data;
};
