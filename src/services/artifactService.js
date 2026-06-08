import api from "../api/api";

// 1. جلب جميع القطع الأثرية
const getAllArtifacts = async () => {
  try {
    const response = await api.get("/api/Artifact");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    return [];
  }
};

// 2. جلب تفاصيل قطعة واحدة بالـ ID (لصفحة التفاصيل)
const getArtifactById = async (id) => {
  try {
    const response = await api.get(`/api/Artifact/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching artifact ${id}:`, error);
    return null;
  }
};

// 3. البحث عن قطع بالاسم (لصفحة البحث)
const searchArtifacts = async (name) => {
  try {
    const response = await api.get(`/api/Artifact/search?name=${name}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error searching artifacts:", error);
    return [];
  }
};

// التصدير الافتراضي كـ Object شامل لكل الدوال
const artifactService = {
  getAllArtifacts,
  getArtifactById,
  searchArtifacts
};

export default artifactService;

