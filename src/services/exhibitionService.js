import api from "../api/api";

const exhibitionService = {
  // جلب كل المعارض
  getAllExhibitions: async () => {
    const response = await api.get("/api/Exhibition");
    return response.data || [];
  },
  // جلب معرض واحد بالـ ID
  getExhibitionById: async (id) => {
    const response = await api.get(`/api/Exhibition/${id}`);
    return response.data;
  }
};

export default exhibitionService;
