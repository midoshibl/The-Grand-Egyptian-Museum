import api from "../api/api";

export const attendanceService = {
  // 1. جلب كل سجلات الحضور (خاص بالأدمن)
  getAll: async () => {
    const response = await api.get("/api/Admin/attendance");
    return response.data.data || [];
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
    const response = await api.put(`/api/Admin/attendance/checkout/${staffId}`);
    return response.data;
  },

  // 4. حذف سجل حضور (خاص بالأدمن)
  delete: async (id) => {
    const response = await api.delete(`/api/Admin/attendance/${id}`);
    return response.data;
  },

  // 5. بصمة حضور الموظف الذكية (خاص بالموظف)
  checkInEmployee: async () => {
    try {
      const response = await api.post("/api/Staff/check-in", {});
      return response.data;
    } catch (error) {
      console.error("Error during employee check-in:", error);
      throw error;
    }
  },

  // 6. بصمة انصراف الموظف الذكية (خاص بالموظف) - الدالة الجديدة
  checkOutEmployee: async () => {
    try {
      const response = await api.put("/api/Staff/check-out");
      return response.data; // يعيد رسالة النجاح ووقت الانصراف الفعلي
    } catch (error) {
      console.error("Error during employee check-out:", error);
      throw error;
    }
  }
};

export default attendanceService;
