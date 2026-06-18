import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [staffList, setStaffList] = useState([]); // قائمة الموظفين الفريدة المستخرجة
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // الحالة الابتدائية للمهمة الجديدة مطابقة لـ الـ Swagger بالملي
  const initialFormState = {
    taskId: 0,
    taskDescription: '',
    isCompleted: false, // نجعلها false افتراضياً للمهمة الجديدة
    taskDate: new Date().toISOString().split('T')[0], // تنسيق حقيقي YYYY-MM-DD
    staffId: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. جلب البيانات الصافية من الـ API الحقيقي الخاص بك
  const loadData = async () => {
    try {
      // الطلب الرسمي والمباشر للباك إند أونلاين عبر الـ https
      const response = await axios.get("https://grandegyptianmuseum1.runasp.net/api/Admin/tasks");
      
      // استقبال مصفوفة المهام الحقيقية القادمة من السيرفر داخل حقل data
      const rawTasks = response.data?.data || [];
      setTasks(rawTasks);

      // استخراج الموظفين الحقيقيين الفعليين المتواجدين بجدول المهام لمنع الانهيار 500
      const uniqueStaffMap = {};
      rawTasks.forEach(item => {
        if (item.staffId && item.staffName) {
          uniqueStaffMap[item.staffId] = item.staffName;
        }
      });

      // تحويل البيانات لمصفوفة صافية جاهزة للـ Select
      const cleanStaff = Object.keys(uniqueStaffMap).map(id => ({
        staffId: Number(id),
        fullName: uniqueStaffMap[id]
      }));

      setStaffList(cleanStaff);
    } catch (err) {
      console.error("خطأ حقيقي في سحب داتا المهام القادمة من السيرفر:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. إرسال مهمة جديدة حقيقية وصارمة للباك إند
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.staffId || Number(formData.staffId) === 0) {
      alert("⚠️ خطأ: يرجى اختيار موظف حقيقي من القائمة لتفادي انهيار السيرفر 500");
      return;
    }

    try {
      const payload = {
        taskId: 0,
        taskDescription: formData.taskDescription,
        isCompleted: false,
        taskDate: formData.taskDate,
        staffId: Number(formData.staffId) // إرسال المعرف الرقمي الفعلي
      };

      // الالتزام التلقائي بالرأس المطلوب في السواجر لمنع الـ 500
      await axios.post("https://grandegyptianmuseum1.runasp.net/api/Admin/tasks", payload, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      alert("تم إسناد المهمة وحفظها في قاعدة البيانات بنجاح ✅");
      setIsModalOpen(false);
      setFormData(initialFormState);
      loadData(); // إعادة التحميل لعكس المهمة الجديدة فوراً
    } catch (err) {
      console.error("Server Submit Error:", err.response?.data);
      alert("فشل في إضافة المهمة: تأكد من مطابقة شروط السيرفر ومقاييس البيانات ❌");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl font-cairo text-slate-700">جاري سحب داتا الـ API الحقيقية وسجلات التكليفات...</div>;
  return (
    // ضبط الـ padding العلوي للتوافق التام مع الناف بار الثابت على كافة الأجهزة والتليفونات
    <div className="p-4 md:p-[120px] bg-gray-50 min-h-screen font-cairo text-right" dir="rtl">
      
      {/* الرأس - متجاوب بالكامل */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="border-r-8 border-emerald-600 pr-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">لوحة توزيع المهام</h1>
          <p className="text-gray-500 text-sm">متابعة تكليفات موظفي المتحف الفعليين - المتحف المصري الكبير</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold transition-all transform hover:scale-105 cursor-pointer border-none outline-none"
        >
          + إسناد مهمة جديدة
        </button>
      </div>

      {/* شبكة توزيع كروت المهام - متجاوبة 100% مع كافة الشاشات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task, index) => (
          <div key={task.taskId || index} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${task.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.isCompleted ? 'مكتملة' : 'قيد التنفيذ'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{task.taskDate}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-6 group-hover:text-emerald-700 transition-colors line-clamp-3">
                {task.taskDescription}
              </h3>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-bold ml-3 border border-emerald-100">
                  {task.staffName?.charAt(0) || '؟'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">{task.staffName || "موظف المتحف"}</div>
                  <div className="text-[10px] text-gray-400 italic">مسؤول المهمة</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* لوحة إضافة مهمة */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-[3rem] p-6 md:p-10 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">إسناد مهمة جديدة</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">وصف المهمة المطلوبة</label>
                <textarea 
                  required 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-32 resize-none text-slate-800 font-medium"
                  placeholder="اكتب تفاصيل التكليف هنا..."
                  onChange={(e) => setFormData({...formData, taskDescription: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">الموظف المسؤول</label>
                <select 
                  required 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 font-bold"
                  onChange={(e) => setFormData({...formData, staffId: e.target.value})}
                  value={formData.staffId}
                >
                  <option value="">-- اختر من قائمة موظفي المتحف الفعليين --</option>
                  
                  {/* الماب الصافي والنظيف من داتا الباك إند الصالحة فقط من جدول المهام */}
                  {staffList.map((s) => (
                    <option key={s.staffId} value={s.staffId}>
                      {s.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg transition-all border-none cursor-pointer">تأكيد الإسناد</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 text-gray-500 py-4 px-6 rounded-2xl font-bold hover:bg-gray-200 transition-all border-none cursor-pointer">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
