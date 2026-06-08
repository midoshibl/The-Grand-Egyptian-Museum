import api from "../api/api";

export const museumService = {
  listSections: async () => {
    const response = await api.get("/api/Museum/list-sections");
    return response.data || [];
  },
  // الدالة التي ستتصل بالـ API الجديد لاستكشاف القاعة
  exploreSection: async (sectionId) => {
    try {
      const response = await api.get(`/api/Museum/explore/${sectionId}`);
      return response.data; // يعيد تفاصيل القسم ومصفوفات المقتنيات
    } catch (error) {
      console.error(`Error exploring section ${sectionId}:`, error);
      return null;
    }
  }
};

export default museumService;
