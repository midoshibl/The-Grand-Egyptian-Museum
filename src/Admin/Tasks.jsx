import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import axios from 'axios'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [staffList, setStaffList] = useState([]); // هنا قائمة الموظفين الحقيقية
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState = {
    taskId: 0,
    taskDescription: '',
    isCompleted: false,
    taskDate: new Date().toISOString().split('T')[0], // تنسيق YYYY-MM-DD
    staffId: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. جلب البيانات (المهام والموظفين الحقيقيين من نفس الـ API الخاص بصفحة الـ Staff)
  const loadData = async () => {
    try {
      // جلب المهام الحقيقية المضافة في قاعدة البيانات
      const responseTasks = await axios.get("https://runasp.net");
      setTasks(responseTasks.data?.data || responseTasks.data || []);

      // 💡 الحل الجذري: جلب قائمة الموظفين الحقيقيين مباشرة من الـ API المسؤول عن صفحة الموظفين (Staff)
      const responseStaff = await axios.get("https://runasp.net");
      const rawStaffData = responseStaff.data?.data || responseStaff.data || [];
      
      setStaffList(rawStaffData);
    } catch (err) {
      console.error("خطأ حقيقي في الربط المباشر بين الصفحتين:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. إرسال مهمة جديدة حقيقية ومربوطة بـ ID موظف حقيقي من الـ Staff
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.staffId) {
      alert("⚠️ يرجى اختيار موظف مسؤول أولاً");
      return;
    }

    try {
      const payload = {
        taskDescription: formData.taskDescription,
        isCompleted: false,
        taskDate: formData.formData?.taskDate || initialFormState.taskDate,
        staffId: Number(formData.staffId), // إرسال الـ ID الفعلي كرقم للباك إند
        taskId: 0
      };

      await axios.post("https://runasp.net", payload);
      alert("تم إسناد المهمة للموظف بنجاح في قاعدة البيانات ✅");
      setIsModalOpen(false);
      setFormData(initialFormState);
      loadData(); // إعادة التحميل لتحديث الكروت على الشاشة فوراً
    } catch (err) {
      console.error(err);
      alert("فشل في إضافة المهمة: تأكد من مطابقة شروط السيرفر");
    }
  };

  // 3. حذف مهمة حقيقية
  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذه المهمة نهائياً؟")) {
      try {
        await axios.delete(`https://runasp.net/${id}`);
        alert("تم الحذف بنجاح من قاعدة البيانات ✅");
        setTasks(tasks.filter(t => t.taskId !== id));
      } catch (err) {
        console.error(err);
        alert("خطأ في الحذف من السيرفر");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl font-cairo">جاري سحب بيانات المهام ومزامنتها مع قائمة الموظفين الحالية...</div>;

  return (
    <div className="p-4 md:p-[120px] bg-gray-50 min-h-screen font-cairo text-right" dir="rtl">
      
      {/* الرأس - متجاوب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="border-r-8 border-emerald-600 pr-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">لوحة توزيع المهام</h1>
          <p className="text-gray-500 text-sm">متابعة تكليفات موظفي صفحة الـ Staff - المتحف المصري الكبير</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold transition-all transform hover:scale-105 cursor-pointer border-none outline-none"
        >
          + إسناد مهمة جديدة
        </button>
      </div>

      {/* شبكة توزيع كروت المهام - متجاوبة 100% */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task, index) => (
          <div key={task.taskId || index} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all group animate-fade-in">
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
                  <div className="text-sm font-bold text-slate-700">{task.staffName || "موظف مسؤول"}</div>
                  <div className="text-[10px] text-gray-400 italic">مسؤول المهمة</div>
                </div>
              </div>
              <button onClick={() => handleDelete(task.taskId)} className="text-gray-300 hover:text-red-500 transition-colors p-2 text-xl border-none bg-none cursor-pointer">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* لوحة إضافة مهمة مدمج بها الموظفين الحقيقيين فقط */}
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
                  <option value="">-- اختر من قائمة موظفي الـ Staff الفعليين --</option>
                  
                  {/* جلب وعرض البيانات الصافية والحقيقية لصفحة الموظفين بالملي */}
                  {staffList.map((s, index) => {
                    const id = s.staffId || s.id || s.StaffId || index;
                    const name = s.fullName || s.fullname || s.FullName || s.name;
                    
                    if (!name || name === "string") return null;

                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
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
