import api from "../api/api";

export const authService = {
  // دالة تسجيل الدخول (طلب POST)
  login: async (credentials) => {
    try {
      const response = await api.post("/api/Auth/login", credentials);
      return response.data; // يعيد التوكن وبيانات المستخدم/الموظف
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
};

export default authService;
