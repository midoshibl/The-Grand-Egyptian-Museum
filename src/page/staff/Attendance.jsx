import React, { useState, useEffect } from "react";
import api from "../../api/api"; // الاعتماد على الـ api الموحد الملتصق بالتوكن

export default function Attendance() {
  const [loading, setLoading] = useState(true);
  const [myRecords, setMyRecords] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const loadAttendanceData = async () => {
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      setUserEmail(localStorage.getItem("userEmail") || "staff@museum.com");

      // 1. GET /api/Staff/all-attendance
      const response = await api.get("/api/Staff/all-attendance");
      const cleanData = response.data?.data || response.data?.Data || response.data || [];
      
      // الفلترة الصارمة بالـ ID لفرز الحركات المعزولة الخاصة بهذا الموظف فقط
      const filtered = cleanData.filter(r => Number(r.staffId || r.StaffId) === loggedInStaffId);
      setMyRecords(filtered);
    } catch (err) {
      console.error("Fetch attendance error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

  // 2. POST /api/Staff/check-in?staffId={id}
  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      const response = await api.post(`/api/Staff/check-in?staffId=${loggedInStaffId}`);
      
      alert(response.data?.message || "تم تسجيل بصمة الحضور بنجاح ⏱️");
      loadAttendanceData(); 
    } catch (err) {
      console.error("Check-in error:", err.response?.data);
      const serverMsg = err.response?.data?.message || err.response?.data?.Message || err.response?.data;
      alert(typeof serverMsg === 'string' ? serverMsg : "عذراً، فشل تسجيل الحضور الفعلي ❌");
    } finally {
      setLoading(false);
    }
  };

  // 3. PUT /api/Staff/check-out?staffId={id}
  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      const response = await api.put(`/api/Staff/check-out?staffId=${loggedInStaffId}`);
      
      alert(response.data?.message || "تم تسجيل بصمة الانصراف بنجاح 👋");
      loadAttendanceData(); 
    } catch (err) {
      console.error("Check-out error:", err.response?.data);
      const serverMsg = err.response?.data?.message || err.response?.data?.Message || err.response?.data;
      alert(typeof serverMsg === 'string' ? serverMsg : "خطأ: لا يوجد سجل حضور مفتوح حالياً لحسابك بالسيرفر ❌");
    } finally {
      setLoading(false);
    }
  };

  // دالتك الأصلية الفابريكا الشغالة تمام والمطابقة للباك إند 100% بدون أي كراش
  const formatTime = (dateStr) => {
    if (!dateStr || dateStr === "string") return "---";
    try {
      const dateObj = new Date(dateStr);
      const hours = String(dateObj.getUTCHours()).padStart(2, '0');
      const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return "---";
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl text-slate-700 font-cairo">جاري الاتصال بالسيرفر ومزامنة السجلات...</div>;

  return (
    <div className="p-[120px] bg-gray-50 min-h-screen font-sans text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الرأس الخاص بصفحة الموظف */}
        <div className="border-r-8 border-indigo-600 pr-4 mb-10">
          <h1 className="text-3xl font-black text-slate-800">بوابة التبصيم الفورية</h1>
          <p className="text-gray-500 text-sm">تسجيل حضور وانصراف شفت العمل ومتابعة التوقيتات الشخصية الفورية</p>
        </div>

        {/* لوحة أزرار التبصيم المباشرة الصافية للـ API */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <button 
            onClick={handleCheckIn}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black transition-all shadow-md active:scale-95 border-none cursor-pointer text-base"
          >
            ⏱️ تسجيل بصمة الحضور الآن
          </button>
          
          <button 
            onClick={handleCheckOut}
            className="bg-red-500 hover:bg-red-700 text-white py-5 rounded-2xl font-black transition-all shadow-md active:scale-95 border-none cursor-pointer text-base"
          >
            🚪 تسجيل بصمة الانصراف الآن
          </button>
        </div>

        {/* جدول عرض توقيتات الدوام الفردية الحقيقية والثابتة للموظف الحالي */}
        <div className="bg-white rounded-2rem shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-gray-100">
            <h3 className="font-black text-slate-800 text-base">سجل حركاتي الشخصية الموثقة بالسيرفر الفعلي</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">الحساب النشط: <span className="font-mono text-slate-600 font-bold">{userEmail}</span></p>
          </div>
          
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-black">
              <tr>
                <th className="p-5 text-center">رقم السجل الرقمي</th>
                <th className="p-5 text-center">توقيت الحضور</th>
                <th className="p-5 text-center">توقيت الانصراف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-bold text-slate-700">
              {myRecords.map((record, index) => (
                <tr key={record.attendanceId || index} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-center text-slate-400 font-mono">#{record.attendanceId || record.AttendanceId}</td>
                  <td className="p-5 text-center text-indigo-600 font-mono font-bold">{formatTime(record.checkIn || record.CheckIn)}</td>
                  <td className="p-5 text-center text-red-400 font-mono font-bold">{formatTime(record.checkOut || record.CheckOut)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {myRecords.length === 0 && (
            <p className="text-center py-10 text-xs font-bold text-slate-400 italic">لم تقم بتسجيل أي حركات دوام في قاعدة البيانات اليوم بعد...</p>
          )}
        </div>

      </div>
    </div>
  );
}
