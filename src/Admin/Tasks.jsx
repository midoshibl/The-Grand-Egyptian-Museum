import React, { useEffect, useState } from 'react';
import api from '../api/api'; // الاعتماد على الـ api الأصلي لالتصاق التوكن

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [staffList, setStaffList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [formData, setFormData] = useState({
    taskId: 0,
    taskDescription: '',
    isCompleted: false, 
    taskDate: getTodayDateString(), 
    staffId: ''
  });

  const loadData = async () => {
    try {
      const [tasksRes, staffRes] = await Promise.all([
        api.get("/api/Admin/tasks"),
        api.get("/api/Admin/staff")
      ]);
      
      // قراءة الـ data السمول للمهام من السيرفر
      setTasks(tasksRes.data?.data || tasksRes.data?.Data || []);

      // قراءة الـ Data الكابيتال للموظفين من السيرفر لفرش الـ select بالـ IDs الحقيقية
      const rawStaff = staffRes.data?.Data || staffRes.data?.data || [];
      setStaffList(rawStaff);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.staffId) {
      alert("⚠️ يرجى اختيار موظف حقيقي من القائمة");
      return;
    }

    try {
      // الالتزام التام بالـ DailyTask Schema الصافية وبدون داتا مزيفة
      const payload = {
        taskId: 0,
        taskDescription: formData.taskDescription.trim(),
        isCompleted: false,
        taskDate: formData.taskDate, // صيغة YYYY-MM-DD
        staffId: Number(formData.staffId) // إرسال معرّف الموظف المنتخب حقيقياً
      };

      await api.post("/api/Admin/tasks", payload);
      alert("تم إسناد المهمة للموظف بنجاح ✅");
      setIsModalOpen(false);
      setFormData({ taskId: 0, taskDescription: '', isCompleted: false, taskDate: getTodayDateString(), staffId: '' });
      loadData(); 
    } catch (err) {
      console.error("Task Submit Error:", err.response?.data);
      alert("فشل في إضافة المهمة ❌");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("⚠️ هل تريد حذف هذه المهمة نهائياً؟")) {
      try {
        await api.delete(`/api/Admin/tasks/${id}`);
        alert("تم حذف المهمة بنجاح ✅");
        loadData();
      } catch (err) {
        alert("فشل حذف المهمة ❌");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl font-cairo text-slate-700">جاري سحب داتا المهام الحقيقية...</div>;
  return (
    <div className="p-4 md:p-[120px] bg-gray-50 min-h-screen font-cairo text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="border-r-4 border-emerald-600 pr-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">لوحة توزيع المهام</h1>
          <p className="text-gray-500 text-sm">متابعة وتكليف موظفي المتحف الفعليين - المتحف المصري الكبير</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold border-none cursor-pointer text-sm">+ إسناد مهمة جديدة</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div key={task.taskId} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all relative">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black ${task.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.isCompleted ? 'مكتملة ✅' : 'قيد التنفيذ ⏱️'}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-400 font-mono">{task.taskDate}</span>
                  <button onClick={() => handleDelete(task.taskId)} className="text-gray-300 hover:text-red-500 transition-colors bg-none border-none cursor-pointer text-base">🗑️</button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-6">{task.taskDescription}</h3>
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-bold ml-3 border border-emerald-100">{(task.staffName || "م").charAt(0)}</div>
                <div>
                  <div className="text-sm font-bold text-slate-700">{task.staffName}</div>
                  <div className="text-[10px] text-gray-400 italic">كود الموظف: {task.staffId}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl text-right">
            <h2 className="text-2xl font-black mb-6 border-r-4 border-emerald-600 pr-2">إسناد مهمة جديدة</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">وصف المهمة المطلوبة</label>
                <textarea required className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none text-slate-800 font-medium text-sm" placeholder="اكتب تفاصيل التكليف هنا..." onChange={(e) => setFormData({...formData, taskDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">الموظف المسؤول</label>
                <select required className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-bold text-sm bg-white" onChange={(e) => setFormData({...formData, staffId: e.target.value})} value={formData.staffId}>
                  <option value="">-- اختر الموظف المسؤول بالـ ID الحقيقي --</option>
                  {staffList.map((s) => (
                    <option key={s.staffId || s.StaffId} value={s.staffId || s.StaffId}>
                      {s.fullName || s.FullName} (ID: {s.staffId || s.StaffId})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg border-none cursor-pointer text-sm">تأكيد الإسناد</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-100 text-gray-500 py-4 px-6 rounded-2xl font-bold border-none cursor-pointer text-sm">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
