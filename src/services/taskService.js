import api from "../api/api";

export const taskService = {
  // 1. جلب كل المهام الصافية من السيرفر
  getMyTasks: async () => {
    try {
      const response = await api.get("/api/Staff/my-tasks");
      return response.data?.data || response.data?.Data || response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  // 2. 💡 الدالة الجديدة: إكمال المهمة (معدلة لتمرير الـ staffId كـ Query Parameter صريح للسيرفر الجديد)
  completeTask: async (taskId) => {
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      
      // إرسال الـ taskId في الـ Path والـ staffId كـ Query Parameter (?staffId=) بالملي كما يشترط السيرفر
      const response = await api.put(`/api/Staff/complete-task/${Number(taskId)}?staffId=${loggedInStaffId}`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
      throw error;
    }
  }
};

export default taskService;
