import api from "../api/api";

export const taskService = {
  // جلب المهام
  getMyTasks: async () => {
    try {
      const response = await api.get("/api/Staff/my-tasks");
      return response.data.data || response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  },

  // الدالة الجديدة: إكمال المهمة بالـ ID
  completeTask: async (taskId) => {
    try {
      const response = await api.put(`/api/Staff/complete-task/${taskId}`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
      throw error;
    }
  }
};

export default taskService;
