import React, { useEffect, useState } from "react";
import api from "../../api/api"; // الاعتماد على الـ api الموحد الملتصق بالتوكن

export default function MyDashboard() {
  const [role, setRole] = useState("Staff");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  
  // إحصائيات حية متطابقة مع مخرجات السيرفر بدون تغيير
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    attendanceStatus: "لم تسجل حركة اليوم 🔴"
  });

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "Staff";
    const name = localStorage.getItem("displayName") || "عضو المتحف";
    const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
    
    setRole(userRole);
    setDisplayName(name);

    const loadDashboardStats = async () => {
      try {
        // سحب داتا المهام والحضور الحية الصافية من السيرفر
        const [tasksRes, attendanceRes] = await Promise.all([
          api.get(userRole === "Admin" || userRole === "admin" ? "/api/Admin/tasks" : "/api/Staff/my-tasks"),
          api.get("/api/Staff/all-attendance")
        ]);

        const rawTasks = tasksRes.data?.data || tasksRes.data?.Data || tasksRes.data || [];
        const rawAttendance = attendanceRes.data?.data || attendanceRes.data?.Data || attendanceRes.data || [];

        if (userRole === "Admin" || userRole === "admin") {
          const total = rawTasks.length;
          const completed = rawTasks.filter(t => t.isCompleted || t.IsCompleted).length;
          
          setStats({
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: total - completed,
            attendanceStatus: `نشط (إجمالي الحركات: ${rawAttendance.length}) 🟢`
          });
        } else {
          // 💡 الفرز الصارم: عزل المهام بالـ staffId الفعلي للموظف الحالي لمنع الثبات على أحمد علي
          const myFilteredTasks = rawTasks.filter(t => Number(t.staffId || t.StaffId) === loggedInStaffId);
          const total = myFilteredTasks.length;
          const completed = myFilteredTasks.filter(t => t.isCompleted || t.IsCompleted).length;

          // 💡 الفرز الصارم للبصمة: جلب آخر سجل حضور يخص هذا الموظف بالـ ID من مصفوفة الـ API
          const myFilteredAttendance = rawAttendance.filter(r => Number(r.staffId || r.StaffId) === loggedInStaffId);
          const lastRecord = myFilteredAttendance[myFilteredAttendance.length - 1]; // لقط أحدث حركة له
          
          let statusText = "لم تسجل حضور اليوم 🔴";
          
          if (lastRecord) {
            const checkInRaw = lastRecord.checkIn || lastRecord.CheckIn;
            const checkOutRaw = lastRecord.checkOut || lastRecord.CheckOut;

            // 💡 التحديث الصارم: عرض النص والساعة المتواجدين في الـ API بالظبط وبدون تلاعب
            if (checkOutRaw) {
              statusText = `تم الانصراف [${checkOutRaw.replace("T", " ")}] 🚪`;
            } else if (checkInRaw) {
              statusText = `داخل الوردية [حضور: ${checkInRaw.replace("T", " ")}] 🟢`;
            }
          }

          setStats({
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: total - completed,
            attendanceStatus: statusText
          });
        }
      } catch (err) {
        console.error("Dashboard Telemetry Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
    const interval = setInterval(loadDashboardStats, 5000); // تحديث لايف كل 5 ثوانٍ
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div></div>;
  return (
    // ضبط الـ padding ليتوافق مع ارتفاع الناف بار الثابت بالموقع على كافة الأجهزة
    <div className="min-h-screen bg-slate-50 pt-[130px] md:pt-[150px] pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* الترحيب ورأس لوحة التحكم حسب الرتبة الفعلي */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-3xl font-black text-slate-900">
              مرحباً بك، {displayName} 👋
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">
              {role === "Admin" || role === "admin" 
                ? "لوحة الإدارة العامة والتحكم بمقتنيات وموظفي المتحف المصري الكبير" 
                : "بوابة الموظف الشخصية لمتابعة التكليفات وإثبات الوردية اليومية"}
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-2.5 text-center shrink-0">
            <span className="text-[10px] text-amber-700 font-bold block uppercase tracking-wider">صلاحية الحساب الحالي</span>
            <span className="text-sm font-black text-amber-800">{role === "Admin" || role === "admin" ? "مدير النظام (Admin) 👑" : "كادر المتحف (Staff) 💼"}</span>
          </div>
        </div>

        {/* شبكة كروت الإحصائيات الحية المستدعاة من قاعدة البيانات بالـ ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* كارت حالة الوردية والدوام كما هي بالـ API بالظبط */}
          <div className="bg-white p-6 rounded-2rem border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-black block mb-1">حالة البصمة اليومية</span>
              <span className="text-sm md:text-base font-black text-slate-800 leading-tight">{stats.attendanceStatus}</span>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold">⏱️</div>
          </div>

          {/* كارت إجمالي المهام المفلترة بالفرد */}
          <div className="bg-white p-6 rounded-2rem border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-black block mb-1">إجمالي المهام المجدولة</span>
              <span className="text-2xl md:text-3xl font-black text-slate-900 font-mono">{stats.totalTasks}</span>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">📋</div>
          </div>

          {/* كارت المهام المكتملة الفردية */}
          <div className="bg-white p-6 rounded-2rem border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-black block mb-1">المهام المنجزة بنجاح</span>
              <span className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">{stats.completedTasks}</span>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold">✅</div>
          </div>

          {/* كارت المهام المعلقة الفردية */}
          <div className="bg-white p-6 rounded-2rem border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="text-slate-400 text-xs font-black block mb-1">التكليفات قيد الانتظار</span>
              <span className="text-2xl md:text-3xl font-black text-amber-600 font-mono">{stats.pendingTasks}</span>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl font-bold">⏳</div>
          </div>

        </div>

        {/* قسم روابط الوصول السريع التفاعلية المتجاوبة حسب الـ Role */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-lg md:text-xl font-black text-slate-800 mb-6 border-r-4 border-slate-900 pr-3">روابط العمليات السريعة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {role === "Admin" || role === "admin" ? (
              <>
                {/* روابط الأدمن الخاصة بالإدارة */}
                <a href="/AdminTasks" className="bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block">
                  🛠️ توزيع وإداراة المهام العامة
                </a>
                <a href="/AdminAttendance" className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block">
                  📊 لوحة الحضور العام والتبصيم اليدوي
                </a>
                <a href="/Staff" className="bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block">
                  👥 إدارة حسابات وكوادر الموظفين
                </a>
              </>
            ) : (
              <>
                {/* روابط الموظف الخاصة بالدوام */}
                <a href="/my-tasks" className="bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block">
                  📋 استعراض وتأكيد التكليفات الفردية
                </a>
                <a href="/Attendance" className="bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block">
                  🚪 بوابة البصمة الشخصية والمغادرة
                </a>
              </>
            )}
            <a href="/Artifacts" className="bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 p-4 rounded-xl font-bold transition-all text-sm no-underline border border-slate-100 text-center block sm:col-span-2 md:col-span-1">
              🏛️ معرض ومتحف القطع الأثرية
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
