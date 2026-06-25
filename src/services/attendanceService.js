import api from "../api/api";

export const attendanceService = {
  // 1. جلب كل سجلات الحضور (خاص بالأدمن)
  getAll: async () => {
    const response = await api.get("/api/Admin/attendance");
    return response.data?.data || response.data?.Data || response.data || [];
  },

  // 2. إضافة سجل حضور يدوي جديد (خاص بالأدمن)
  add: async (data) => {
    const response = await api.post("/api/Admin/attendance", {
      attendanceId: 0,
      staffId: Number(data.staffId),
      checkIn: data.checkIn || new Date().toISOString(),
      checkOut: null 
    });
    return response.data;
  },

  // 3. تسجيل انصراف موظف (خاص بالأدمن)
  checkOut: async (staffId) => {
    const response = await api.put(`/api/Admin/attendance/checkout/${Number(staffId)}`);
    return response.data;
  },

  // 4. حذف سجل حضور (خاص بالأدمن)
  delete: async (id) => {
    const response = await api.delete(`/api/Admin/attendance/${Number(id)}`);
    return response.data;
  },

  // 5. 💡 بصمة حضور الموظف الذكية (معدلة لتمرير الـ staffId كـ Query Parameter)
  checkInEmployee: async () => {
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      // تمرير الباراميتر صراحة في الرابط لتطابق السواجر الجديد بالملي
      const response = await api.post(`/api/Staff/check-in?staffId=${loggedInStaffId}`, {});
      return response.data;
    } catch (error) {
      console.error("Error during employee check-in:", error);
      throw error;
    }
  },

  // 6. 💡 بصمة انصراف الموظف الذكية (معدلة لتمرير الـ staffId كـ Query Parameter)
  checkOutEmployee: async () => {
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      // تمرير الباراميتر صراحة في الرابط لتطابق السواجر الجديد بالملي
      const response = await api.put(`/api/Staff/check-out?staffId=${loggedInStaffId}`);
      return response.data; 
    } catch (error) {
      console.error("Error during employee check-out:", error);
      throw error;
    }
  }
};

export default attendanceService;
