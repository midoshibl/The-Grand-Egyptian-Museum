import React, { useEffect, useState } from 'react';
import taskService from '../../services/taskService';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // دالة جلب وتحديث قائمة المهام من السيرفر
  const loadTasks = () => {
    setLoading(true);
    taskService.getMyTasks()
      .then(data => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading tasks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // دالة تحديث حالة المهمة عند الضغط على الزر (طلب PUT)
  const handleCompleteTask = async (taskId) => {
    try {
      await taskService.completeTask(taskId);
      alert("ممتاز! تم تحديث حالة التكليف وإنجازه بنجاح في قاعدة البيانات ✅");
      loadTasks(); // إعادة تحميل القائمة من السيرفر لإخفاء المهمة المكتملة
    } catch (err) {
      console.error(err);
      alert("فشل تحديث المهمة: تأكد من صلاحيات الحساب وتوفر الاتصال بالسيرفر.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo p-4">
      <div className="text-center max-w-xs sm:max-w-md">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-base sm:text-lg font-bold text-slate-600 animate-pulse">جاري تحديث قائمة التكليفات...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20 md:pt-32 pb-12 px-3 sm:px-6 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الرأس الترحيبي بالموظف - متجاوب بالكامل */}
        <div className="bg-slate-950 text-white rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-xl mb-6 md:mb-10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
          <p className="text-amber-500 font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mb-1">بوابة الموظفين</p>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black mb-2 md:mb-3 leading-tight">لوحة التكليفات والمهام</h1>
          <p className="text-slate-400 text-[11px] sm:text-xs md:text-base leading-relaxed">تابع التكليفات الجارية المسندة إليك من إدارة المتحف، واضغط على زر الإكمال فور انتهائك لتحديث السجل الإداري.</p>
        </div>

        <h2 className="text-lg md:text-2xl font-black text-slate-800 mb-4 md:mb-6 border-r-4 border-amber-600 pr-3">التكليفات الجارية حالياً</h2>
        
        {/* شبكة المهام المتجاوبة مع الموبايل والتابلت واللابتوب */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tasks.map((task, index) => (
            <div 
              key={task.taskId || index} 
              className="bg-white rounded-2xl sm:rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md md:hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* بادج توضيحي لحالة المهمة الحالية - متجاوب للنصوص الطويلة */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse border border-amber-200 block whitespace-nowrap">
                    ⚠️ قيد التنفيذ
                  </span>
                  <span className="text-slate-400 text-[10px] font-medium">🆔 كود {task.taskId || index + 1}</span>
                </div>

                {/* عنوان المهمة وتفاصيلها من الباك إند */}
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 sm:mb-3 leading-tight wrap-break-word">
                  {task.taskName && task.taskName !== "string" ? task.taskName : "تكليف إداري عام"}
                </h3>
                
                <p className="text-slate-500 text-[11px] sm:text-xs md:text-sm leading-relaxed mb-5 sm:mb-6 italic wrap-break-word">
                  {task.description && task.description !== "string" ? task.description : "برجاء مراجعة تفاصيل التكليف الإضافي المقيد على السيستم مع الإدارة العلمية للقسم."}
                </p>
              </div>

              {/* قسم الإجراءات والزر السفلي */}
              <div className="space-y-3 sm:space-y-4 mt-auto">
                <button
                  type="button"
                  onClick={() => handleCompleteTask(task.taskId)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl sm:rounded-2xl font-bold text-xs md:text-sm hover:bg-emerald-600 active:bg-emerald-700 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 touch-manipulation"
                >
                  <span className="text-sm">⚡</span> اضغط هنا لإكمال المهمة
                </button>

                <div className="pt-2.5 border-t border-slate-50 flex flex-wrap gap-1 items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-400">
                  <span className="truncate">📅 الموعد: {task.dueDate || new Date().toLocaleDateString('ar-EG')}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* حالة إذا كانت قائمة المهام فارغة تماماً من السيرفر */}
        {tasks.length === 0 && (
          <div className="text-center py-12 sm:py-20 px-4 bg-white rounded-2xl sm:rounded-[3rem] border-2 border-dashed border-slate-200">
            <span className="text-4xl sm:text-5xl mb-3 sm:mb-4 block">🎉</span>
            <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-700">أحسنت! لا توجد مهام معلقة</h3>
            <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-2">تم إنهاء كافة التكليفات اليومية وتحديث سجلات قاعدة البيانات بنجاح.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTasks;
