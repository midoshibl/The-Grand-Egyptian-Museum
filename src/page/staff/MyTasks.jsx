import React, { useEffect, useState } from "react";
import { Clock, CheckCircle2, ShieldAlert, LogOut } from "lucide-react";
import api from "../../api/api"; // الاعتماد على الـ api الموحد الملتصق بالتوكن

export default function MyTasks() {
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAttendanceActive, setIsAttendanceActive] = useState(false); 
  const [hasCheckedOut, setHasCheckedOut] = useState(false); 
  const [myStaffId, setMyStaffId] = useState(null);

  const fetchMyTasksAndAttendance = async () => {
    try {
      // 💡 قراءة الـ StaffId الحقيقي والخاص بالموظف النشط حالياً لمنع التداخل مع أحمد علي
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      setMyStaffId(loggedInStaffId);

      // 1. جلب سجلات الحضور العامة لفحص حالة التحضير والدوام اليوم
      const attendanceRes = await api.get("/api/Staff/all-attendance");
      const records = attendanceRes.data?.data || attendanceRes.data?.Data || attendanceRes.data || [];
      const todayStr = new Date().toISOString().split('T');

      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();

      // الفرز الصارم لسجل اليوم الفعلي الخاص بهذا الموظف تحديداً بالـ ID
      const todayRecord = records.find(r => {
        const rStaffId = Number(r.staffId || r.StaffId);
        const checkInStr = r.checkIn || r.CheckIn;
        if (!checkInStr) return false;
        
        const rDate = new Date(checkInStr);
        return rStaffId === loggedInStaffId && 
               rDate.getFullYear() === currentYear && 
               rDate.getMonth() === currentMonth && 
               rDate.getDate() === currentDay;
      });

      if (todayRecord) {
        const isEnded = todayRecord.checkOut || todayRecord.CheckOut;
        if (isEnded) {
          setIsAttendanceActive(false);
          setHasCheckedOut(true);
          setMyTasks([]);
        } else {
          setIsAttendanceActive(true);
          setHasCheckedOut(false);
          
          // 💡 2. جلب مصفوفة المهام العامة بالـ API الصافي
          const response = await api.get("/api/Staff/my-tasks");
          const cleanResponse = response.data?.data || response.data?.Data || response.data || [];
          
          // حل ثغرة الباك إند: فلترة وعزل المهام بالـ staffId الفعلي للموظف الحالي
          const filteredTasks = cleanResponse.filter(task => Number(task.staffId || task.StaffId) === loggedInStaffId);
          setMyTasks(filteredTasks);
        }
      } else {
        // لو الموظف التاني لسه الأدمن محضرهوش اليوم، تظل شاشته محجوبة ومستحيل يرى داتا أحمد علي
        setIsAttendanceActive(false);
        setHasCheckedOut(false);
        setMyTasks([]);
      }
    } catch (err) {
      console.error("Security Flow Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasksAndAttendance();
  }, []);

  // 💡 3. PUT /api/Staff/complete-task/{taskId}?staffId={id} (تأكيد إنجاز التكليف)
  const handleCompleteTask = async (taskId) => {
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      // إرسال الـ taskId في الـ Path والـ staffId في الـ Query parameter بالملي
      await api.put(`/api/Staff/complete-task/${Number(taskId)}?staffId=${loggedInStaffId}`);
      alert("تم تحديث حالة التكليف بنجاح وتحويله إلى مكتمل ✅");
      fetchMyTasksAndAttendance(); 
    } catch (err) {
      console.error("Complete Task API Error:", err.response?.data);
      alert("فشل تحديث حالة المهمة ❌");
    }
  };
  const handleStaffCheckOut = async () => {
    if (!window.confirm("هل أنت متأكد من تسجيل بصمة الانصراف وإغلاق لوحة المهام لليوم؟")) return;
    setLoading(true);
    try {
      const loggedInStaffId = Number(localStorage.getItem("userStaffId")) || 1;
      await api.put(`/api/Staff/check-out?staffId=${loggedInStaffId}`);
      alert("تم تسجيل انصرافك وإغلاق ملف الدوام والمهام بنجاح ✅");
      fetchMyTasksAndAttendance(); 
    } catch (err) {
      console.error("Check-out Error:", err);
      alert("فشل تسجيل الانصراف من السيرفر ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-28 md:pt-36 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* الحماية الأولى: لو الأدمن لسه مسجلش حضور للموظف اليوم بجدول السيرفر الحقيقي */}
        {!isAttendanceActive && !hasCheckedOut && (
          <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 max-w-2xl mx-auto text-center mt-6">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6 border border-amber-100 animate-bounce">
              <ShieldAlert size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">لوحة المهام مغلقة مؤقتاً</h2>
            <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
              عذراً يا بشمهندس، السيستم مغلق. لا توجد لديك صلاحية لاستعراض المهام أو التحكم باللوحة الرقمية للمتحف إلا بعد قيام **الأدمن بتوثيق وتأكيد بصمة حضورك اليومي** أولاً بكود المعرّف الخاص بك في جدول الإدارة.
            </p>
            <span className="text-xs font-black bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100/50">
              حالة الأمن: حظر تفاعلي منفصل لكل موظف 🔒
            </span>
          </div>
        )}

        {/* الحماية الثانية: لو الموظف أنجز أعماله وضغط زرار الانصراف وروّح */}
        {!isAttendanceActive && hasCheckedOut && (
          <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 max-w-2xl mx-auto text-center mt-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-100">
              <LogOut size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">انتهت فترة الصلاحية اليومية</h2>
            <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
              لقد قمت بتسجيل بصمة الانصراف وإغلاق ملف الدوام لليوم بنجاح. تم سحب صلاحية التعديل على التكليفات الرقمية المعزولة لحسابك حتى بداية الشفت القادم. نشكر جهودك اليوم في المتحف المصري الكبير!
            </p>
            <span className="text-xs font-black bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100/50">
              حالة الوردية: مغلقة ومكتملة 🚪
            </span>
          </div>
        )}

        {/* الواجهة المفتوحة والنشطة: تفتح طلقة فقط وحصرياً لو الأدمن مسجله حضور بالسيرفر */}
        {isAttendanceActive && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-r-4 border-amber-500 pr-3 mb-10">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">جدول مهامي وتكليفاتي الحية</h1>
                <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">الوردية مفعلة (كودك الفعلي الحالي: {myStaffId}) - قم بتأكيد التكليفات فور الإنجاز</p>
              </div>
              <button
                onClick={handleStaffCheckOut}
                className="w-full sm:w-auto bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg font-black transition-all flex items-center justify-center gap-2 text-xs md:text-sm border-none cursor-pointer active:scale-95"
              >
                <LogOut size={16} /> تسجيل بصمة الانصراف مغادرة 🚪
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTasks.map((task) => {
                const tId = task.taskId || task.TaskId;
                const isComp = task.isCompleted || task.IsCompleted;
                const tDate = task.taskDate || task.TaskDate;
                const desc = task.taskDescription || task.TaskDescription;

                return (
                  <div 
                    key={tId} 
                    className={`bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 flex flex-col justify-between h-full hover:shadow-md ${isComp ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-100'}`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1 ${isComp ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {isComp ? "مكتملة ✅" : "قيد التنفيذ ⏱️"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock size={12} /> {tDate}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-slate-800 leading-relaxed mb-6">
                        {desc}
                      </h3>
                    </div>

                    <div className="border-t border-slate-50 pt-4 mt-auto">
                      {isComp ? (
                        <div className="w-full bg-emerald-100 text-emerald-700 text-center py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 select-none">
                          تم إنجاز التكليف وإرساله للمدير
                        </div>
                      ) : (
                        <button
                          onClick={() => handleCompleteTask(tId)}
                          className="w-full bg-slate-900 text-white hover:bg-emerald-600 text-center py-2.5 rounded-xl font-bold transition-all border-none cursor-pointer text-xs active:scale-95"
                        >
                          تأكيد إتمام وإنجاز المهمة 🚀
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {myTasks.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 max-w-2xl mx-auto px-4">
                <span className="text-5xl block mb-3">🎉</span>
                <h3 className="text-slate-700 font-black text-base mb-1">لا توجد تكليفات معلقة لحسابك</h3>
                <p className="text-slate-400 font-bold italic text-xs">جدول أعمالك اليومي خالٍ تماماً، استمتع بيومك في المتحف!</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
