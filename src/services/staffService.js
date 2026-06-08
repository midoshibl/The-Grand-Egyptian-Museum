import api from "../api/api";

// جلب الكل
export const getAllStaff = async () => {
  const response = await api.get("/api/Admin/staff");
  return response.data.data || [];
};

// إضافة جديد
export const addStaff = async (staffData) => {
  const response = await api.post("/api/Admin/staff", staffData);
  return response.data;
};

// تعديل
export const updateStaff = async (id, staffData) => {
  const response = await api.put(`/api/Admin/staff/${id}`, staffData);
  return response.data;
};

// حذف
export const deleteStaff = async (id) => {
  const response = await api.delete(`/api/Admin/staff/${id}`);
  return response.data;
};

