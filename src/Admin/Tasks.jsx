import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { getAllStaff } from '../services/staffService';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // الحالة الابتدائية للمهمة الجديدة
  const initialFormState = {
    taskId: 0,
    taskDescription: '',
    isCompleted: false,
    taskDate: new Date().toISOString().split('T')[0], // تنسيق YYYY-MM-DD
    staffId: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. جلب البيانات (المهام والموظفين)
  const loadData = async () => {
    try {
      const [tasksData, staffData] = await Promise.all([
        taskService.getAll(),
        getAllStaff()
      ]);
      setTasks(tasksData);
      setStaffList(staffData);
    } catch (err) {
      console.error("خطأ في التحميل:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. إضافة مهمة جديدة
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        staffId: Number(formData.staffId), // التأكد من إرسال الـ ID كرقم
        taskId: 0
      };
      await taskService.add(payload);
      alert("تم إسناد المهمة بنجاح");
      setIsModalOpen(false);
      setFormData(initialFormState);
      loadData();
    } catch (err) {
      alert("فشل في إضافة المهمة (تأكد من اختيار موظف حقيقي)");
    }
  };

  // 3. حذف مهمة
  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذه المهمة نهائياً؟")) {
      try {
        await taskService.delete(id);
        setTasks(tasks.filter(t => t.taskId !== id));
      } catch (err) {
        alert("خطأ في الحذف");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl">جاري تحميل لوحة المهام...</div>;

  return (
    <div className="p-[120px] bg-gray-50 min-h-screen font-sans" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="border-r-8 border-emerald-600 pr-4">
          <h1 className="text-3xl font-black text-slate-900 uppercase">لوحة توزيع المهام</h1>
          <p className="text-gray-500">متابعة تكليفات الموظفين - المتحف المصري الكبير</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold transition-all transform hover:scale-105"
        >
          + إسناد مهمة جديدة
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div key={task.taskId} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ${task.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.isCompleted ? 'مكتملة' : 'قيد التنفيذ'}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{task.taskDate}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-6 group-hover:text-emerald-700 transition-colors">
                {task.taskDescription}
              </h3>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-bold ml-3 border border-emerald-100">
                  {task.staffName?.charAt(0) || '؟'}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">{task.staffName}</div>
                  <div className="text-[10px] text-gray-400 italic">مسؤول المهمة</div>
                </div>
              </div>
              <button onClick={() => handleDelete(task.taskId)} className="text-gray-300 hover:text-red-500 transition-colors p-2 text-xl">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة مهمة */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl">
            <h2 className="text-3xl font-black mb-8 text-slate-900">إسناد مهمة جديدة</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">وصف المهمة المطلوبة</label>
                <textarea 
                  required className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-32 resize-none"
                  placeholder="مثال: تعقيم قاعة الملك توت عنخ آمون..."
                  onChange={(e) => setFormData({...formData, taskDescription: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-2">الموظف المسؤول</label>
                <select 
                  required className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, staffId: e.target.value})}
                >
                  <option value="">-- اختر من قائمة الموظفين --</option>
                  {staffList.map(s => <option key={s.staffId} value={s.staffId}>{s.fullName}</option>)}
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-2 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg transition-all">تأكيد الإسناد</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
