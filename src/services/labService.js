import api from "../api/api";

export const labService = {
  // جلب كافة معامل الترميم
  getAllLabs: async () => {
    try {
      const response = await api.get("/api/ConservationLab");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching labs:", error);
      return [];
    }
  }
};

export default labService;
