import api from "../api/api";

export const gardenService = {
  // جلب كافة الحدائق
  getAllGardens: async () => {
    try {
      const response = await api.get("/api/Garden");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching gardens:", error);
      return [];
    }
  }
};

export default gardenService;
