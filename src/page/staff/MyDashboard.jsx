import React, { useEffect, useState } from "react";
import Tasks from "../../Admin/Tasks"; // استدعاء لوحة توزيع المهام الشاملة للأدمن
import MyTasks from "./MyTasks"; // استدعاء جدول المهام الفردية للموظف
import Attendance from "./Attendance"; // استدعاء بوابة البصمة وإثبات الحضور
import { Shield, UserCheck, Briefcase, Calendar } from "lucide-react";

export default function MyDashboard() {
  const [role, setRole] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // قراءة الصلاحية والإيميل الحقيقيين المخزنين بملف الـ Login
    const storedRole = localStorage.getItem("userRole");
    const storedEmail = localStorage.getItem("userEmail");
    
    setRole(storedRole || "User");
    setUserEmail(storedEmail || "");
  }, []);

  // 💡 1. التوجيه وفصل العرض التلقائي لـ شاشات اللابتوب والكمبيوتر (Desktop):
  // إذا كان الحساب أدمن، تظهر له صفحة توزيع وإدارة المهام العليا فوراً
  if (role === "Admin" || role === "admin") {
    return <Tasks />;
  }
  // 💡 2. التوجيه الديناميكي المباشر إذا كان الحساب موظف (Staff):
  // السيرفر يتعرف عليه ويعرض له قائمة مهامه وبصمته الشخصية فوراً دون تداخل
  if (role === "Staff" || role === "staff") {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
        <div className="max-w-6xl mx-auto">
          
          {/* بنية الترحيب بالموظف الفعلي */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="flex items-center gap-4 text-center md:text-right flex-col md:flex-row">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 shadow-inner">
                <UserCheck size={28} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900">مرحباً بك في بوابة الكوادر البشرية</h1>
                <p className="text-xs text-slate-400 font-bold mt-1">الحساب المعتمد الحالي: <span className="font-mono text-emerald-600">{userEmail}</span></p>
              </div>
            </div>
            
            <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl tracking-wider uppercase shadow-inner shrink-0">
              💼 رتبة: موظف المتحف
            </span>
          </div>

          {/* شبكة توزيع الخدمات الداخلية للموظف متجاوبة بالكامل */}
          <div className="space-y-12">
            {/* عرض بوابة البصمة وإثبات الحضور والانصراف حقيقياً */}
            <div className="bg-white rounded-[2.5rem] p-2 md:p-6 shadow-sm border border-slate-100">
              <Attendance />
            </div>

            {/* عرض جدول المهام والتكليفات الفردية الخاصة بهذا الموظف بالملي */}
            <div className="bg-white rounded-[2.5rem] p-2 md:p-6 shadow-sm border border-slate-100">
              <MyTasks />
            </div>
          </div>

        </div>
      </div>
    );
  }

  {/* 💡 3. حماية أمنية للموقع الحي: لو زائر عادي (Visitor) حاول يدخل للداشبورد بالخطأ، يتم توجيهه للتذاكر */}
  return (
    <div className="min-h-screen bg-slate-50 pt-36 pb-16 px-4 text-center font-cairo" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <span className="text-5xl block mb-4">🔒</span>
        <h2 className="text-xl font-black text-slate-800 mb-2">منطقة محمية رقمياً</h2>
        <p className="text-xs text-slate-400 font-bold mb-6">عذراً، هذه اللوحة مخصصة فقط لأدمن وموظفي المتحف المصري الكبير.</p>
        <button 
          onClick={() => window.location.href = "/Booking"}
          className="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-bold border-none cursor-pointer hover:bg-amber-600 transition-colors shadow-md"
        >
          الانتقال لصفحة حجز التذاكر 🎟️
        </button>
      </div>
    </div>
  );
}
