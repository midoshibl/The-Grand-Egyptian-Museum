import React, { useEffect, useState } from 'react';
import { getAllStaff, addStaff, updateStaff, deleteStaff } from '../services/staffService';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // الحالة الابتدائية بناءً على الـ Schema الجديدة
  const initialFormState = {
    staffId: 0,
    fullName: '',
    email: '', // ملاحظة: يجب أن ينتهي بـ @gmail.com أو @yahoo.com
    passwordHash: 'Pass@123', // حقل إجباري (Required)
    position: '',
    sectionId: 1,
    hireDate: new Date().toISOString()
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. جلب البيانات
  const loadData = async () => {
    try {
      const data = await getAllStaff();
      setStaff(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. معالجة الإرسال (إضافة أو تعديل)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التأكد من شرط الإيميل برمجياً قبل الإرسال لتجنب خطأ 400
    const emailPattern = /@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email)) {
      alert("خطأ: السيرفر لا يقبل إلا إيميلات gmail.com أو yahoo.com فقط");
      return;
    }

    const payload = {
      ...formData,
      staffId: editId ? Number(editId) : 0,
      sectionId: formData.sectionId ? Number(formData.sectionId) : null,
      hireDate: editId ? formData.hireDate : new Date().toISOString()
    };

    try {
      if (editId) {
        await updateStaff(editId, payload);
        alert("تم التعديل بنجاح ✅");
      } else {
        await addStaff(payload);
        alert("تمت إضافة الموظف بنجاح ✅");
      }
      closeModal();
      loadData();
    } catch (err) {
      console.error("Server Error:", err.response?.data);
      alert("فشل في العملية: راجع الـ Console للتفاصيل (غالباً مشكلة في البيانات)");
    }
  };

  // 3. معالجة الحذف
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
      try {
        await deleteStaff(id);
        setStaff(staff.filter(s => s.staffId !== id));
        alert("تم الحذف بنجاح");
      } catch (err) {
        alert("فشل الحذف: الموظف مرتبط ببيانات أخرى في السيستم");
      }
    }
  };

  const openEditModal = (member) => {
    setEditId(member.staffId);
    setFormData(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData(initialFormState);
  };

  if (loading) return <div className="p-20 text-center text-xl font-bold text-slate-700">جاري تحميل موظفي المتحف...</div>;

  return (
    <div className="p-[120px] bg-gray-50 min-h-screen font-sans" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="border-r-8 border-amber-600 pr-4">
          <h1 className="text-3xl font-black text-slate-900">إدارة الموظفين</h1>
          <p className="text-gray-500">لوحة تحكم الكوادر البشرية - المتحف المصري الكبير</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold transition transform hover:scale-105"
        >
          + إضافة موظف جديد
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff.map((member) => (
          <div key={member.staffId} className="bg-white p-6 rounded-2rem shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl text-amber-700 font-bold">
                {member.fullName.charAt(0)}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(member)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition">✏️</button>
                <button onClick={() => handleDelete(member.staffId)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition">🗑️</button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{member.fullName}</h3>
            <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-4">{member.position || 'بدون مسمى وظيفي'}</p>
            <div className="space-y-2 border-t pt-4 text-sm text-gray-500">
              <div className="flex items-center"><span className="ml-2">📧</span> {member.email}</div>
              <div className="flex items-center"><span className="ml-2">🏛️</span> القسم: {member.sectionId || 'غير محدد'}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة وتعديل */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-slate-900">{editId ? 'تعديل البيانات' : 'إضافة موظف'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">الاسم بالكامل</label>
                <input 
                  type="text" required value={formData.fullName}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">البريد (يجب gmail أو yahoo)</label>
                <input 
                  type="email" required value={formData.email}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">المسمى الوظيفي</label>
                <input 
                  type="text" value={formData.position}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none"
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-amber-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-700 transition">حفظ</button>
                <button type="button" onClick={closeModal} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
