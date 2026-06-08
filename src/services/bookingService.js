import api from "../api/api";

export const bookingService = {
  
  // 1. جلب فترات المواعيد المتاحة (09:00 AM - 11:00 AM, إلخ)
  getAvailableSlots: async () => {
    try {
      const response = await api.get("/api/Booking/available-slots");
      // السيرفر يعيد مصفوفة (Array) من المواعيد مباشرة
      return response.data || [];
    } catch (error) {
      console.error("Error fetching available slots:", error);
      return [];
    }
  },

  // 2. جلب قائمة أسعار وفئات التذاكر (مصريين، عرب، أجانب)
  getTicketMenu: async () => {
    try {
      const response = await api.get("/api/Booking/ticket-menu");
      // السيرفر يعيد مصفوفة من المجموعات (Groups) وكل واحدة تحتوي على الخيارات والأسعار
      return response.data || [];
    } catch (error) {
      console.error("Error fetching ticket menu:", error);
      return [];
    }
  },

  // 3. إرسال طلب الحجز النهائي (POST)
  submitBooking: async (bookingData) => {
    try {
      // إرسال البيانات (الاسم، الإيميل، الباسورد، رقم السعر، الموعد، والكمية)
      const response = await api.post("/api/Booking/submit-booking", bookingData);
      return response.data;
    } catch (error) {
      console.error("Error submitting booking:", error);
      // نقوم بإعادة الخطأ لكي تظهر رسالة الفشل (مثل 401) في الصفحة
      throw error;
    }
  }
};

// التصدير الافتراضي لضمان عمل الـ Import بدون أقواس {} في الصفحات
export default bookingService;
