import React, { useEffect, useState } from "react";
import { CheckCircle2, Clock, Briefcase } from "lucide-react";
import api from "../../api/api"; // استخدام ملف الـ axios المشترك ليلتصق التوكن تلقائياً بالطلب

export default function MyTasks() {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جلب مهام الموظف الحالي المسجل دخول بالتوكن
  const fetchMyTasks = async () => {
    try {
      // طلب الـ GET الرسمي المطابق للـ Swagger بالملي
      const response = await api.get("/api/Staff/my-tasks");
      
      // استقبال المصفوفة الحقيقية القادمة بداخل حقل data
      const tasksData = response.data?.data || response.data || [];
      setMyTasks(tasksData);
    } catch (err) {
      console.error("Error fetching staff tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  // 2. تحديث حالة المهمة وتحويلها إلى مكتملة عبر طلب الـ PUT
  const handleCompleteTask = async (taskId) => {
    if (!window.confirm("هل قمت بإنجاز وتأكيد هذه المهمة بالفعل؟")) return;

    try {
      // إرسال الـ taskId بداخل مسار الـ Endpoint كما يشترط الباك إند
      await api.put(`/api/Staff/complete-task/${taskId}`);
      alert("تم تحديث حالة التكليف بنجاح وتحويله إلى مكتمل ✅");
      fetchMyTasks(); // إعادة التحميل لفرش الحالة الجديدة على الشاشة
    } catch (err) {
      console.error("Error completing task:", err);
      alert("فشل تحديث حالة المهمة، يرجى مراجعة اتصال السيرفر.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );
  return (
    // ضبط الـ padding العلوي للتوافق التام مع الناف بار الثابت على كافة الأجهزة والتليفونات
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* رأس الصفحة */}
        <div className="border-r-4 border-amber-500 pr-3 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">جدول مهامي وتكليفاتي</h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">تابع المهام والمسؤوليات اليومية المسندة إليك من الإدارة وتحديث حالتها فور الإنجاز</p>
        </div>

        {/* شبكة المهام المتجاوبة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTasks.map((task) => (
            <div 
              key={task.taskId} 
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 flex flex-col justify-between h-full hover:shadow-md ${task.isCompleted ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-100'}`}
            >
              <div>
                {/* حالة المهمة وتاريخها */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1 ${task.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {task.isCompleted ? "مكتملة ✅" : "قيد التنفيذ ⏱️"}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock size={12} /> {task.taskDate}
                  </span>
                </div>

                {/* وصف التكليف الحقيقي */}
                <h3 className="text-base md:text-lg font-bold text-slate-800 leading-relaxed mb-6">
                  {task.taskDescription}
                </h3>
              </div>

              {/* زر الإجراء السفلي */}
              <div className="border-t border-slate-50 pt-4 mt-auto">
                {task.isCompleted ? (
                  <div className="w-full bg-emerald-100 text-emerald-700 text-center py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 select-none">
                    <CheckCircle2 size={14} /> تم إنجاز التكليف بنجاح
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteTask(task.taskId)}
                    className="w-full bg-slate-900 text-white hover:bg-emerald-600 text-center py-2.5 rounded-xl font-bold transition-all border-none cursor-pointer text-xs active:scale-95"
                  >
                    تأكيد إتمام وإنجاز المهمة 🚀
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* حالة عدم وجود مهام مسندة */}
        {myTasks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto px-4">
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-slate-700 font-black text-base mb-1">لا توجد تكليفات معلقة</h3>
            <p className="text-slate-400 font-bold italic text-xs">جدول مهامك خالٍ تماماً حالياً، استمتع بيومك في المتحف!</p>
          </div>
        )}

      </div>
    </div>
  );
}
