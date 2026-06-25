import React, { useEffect, useState } from 'react';
import { getAllStaff, addStaff, updateStaff, deleteStaff } from '../services/staffService';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // 💡 التحديث: الحالة الابتدائية مطابقة لـ Schema السيرفر الإلزامية بالملي
  const initialFormState = {
    staffId: 0,
    fullName: '',
    email: '', 
    passwordHash: '', // حقل الباسورد الإجباري المسجل بالـ Schema
    position: '',
    sectionId: '', // سنتركه فارغاً ليدعم الـ null لو لم يختر قسم
    hireDate: new Date().toISOString()
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. جلب البيانات الصافية من حقل Data الكابيتال في السيرفر
  const loadData = async () => {
    try {
      const response = await getAllStaff();
      const cleanData = response?.Data || response?.data || response || [];
      setStaff(cleanData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 2. معالجة الإرسال (إضافة أو تعديل) بمطابقة شروط الـ Schema بالملي
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 💡 التحقق الصارم من الـ Pattern الخاص بالإيميل المعتمد في السواجر منعا للـ 400
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email.trim())) {
      alert("⚠️ عذراً، يجب استخدام حساب Gmail أو Yahoo فقط بالصيغة الصحيحة");
      return;
    }

    // 💡 صياغة الـ Payload الحقيقي الصافي المتطابق مع أنواع بيانات الباك إند (int و string)
    const payload = {
      staffId: editId ? Number(editId) : 0,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      passwordHash: formData.passwordHash ? formData.passwordHash.trim() : "Pass@123", // حقل الـ passwordHash الإجباري
      position: formData.position ? formData.position.trim() : null, // مسموح بـ null حسب السكيما
      sectionId: formData.sectionId ? Number(formData.sectionId) : null, // تحويله لـ int صريح أو null لمنع الـ 400
      hireDate: editId ? formData.hireDate : new Date().toISOString()
    };

    try {
      if (editId) {
        await updateStaff(editId, payload);
        alert("تم التعديل بنجاح ✅");
      } else {
        await addStaff(payload);
        alert("تمت إضافة الموظف بنجاح في قاعدة البيانات الحقيقية ✅");
      }
      closeModal();
      loadData();
    } catch (err) {
      console.error("Server Error Detail:", err.response?.data);
      // طباعة رسالة الـ BadRequest الأصلية من قاعدة البيانات (مثل البريد مسجل مسبقاً)
      const serverMessage = err.response?.data?.Message || err.response?.data?.message || err.response?.data;
      alert(typeof serverMessage === 'string' ? serverMessage : "فشل في العملية: البريد مسجل مسبقاً لموظف آخر أو البيانات غير مكتملة ❌");
    }
  };

  // 3. معالجة الحذف
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الموظف نهائياً من قاعدة البيانات؟")) {
      try {
        await deleteStaff(id);
        setStaff(staff.filter(s => s.staffId !== id));
        alert("تم الحذف بنجاح ✅");
        loadData();
      } catch (err) {
        alert("فشل الحذف: الموظف مرتبط بسجلات أخرى في السيستم ❌");
      }
    }
  };

  const openEditModal = (member) => {
    setEditId(member.staffId);
    setFormData({
      staffId: member.staffId,
      fullName: member.fullName || '',
      email: member.email || '',
      passwordHash: member.passwordHash || 'Pass@123',
      position: member.position || '',
      sectionId: member.sectionId || '',
      hireDate: member.hireDate || new Date().toISOString()
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData(initialFormState);
  };

  if (loading) return <div className="p-20 text-center text-xl font-bold text-slate-700 font-cairo">جاري تحميل موظفي المتحف ومزامنة قاعدة البيانات الحقيقية...</div>;
  return (
    <div className="pt-[120px] px-3 pb-8 bg-gray-50 min-h-screen font-sans" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="border-r-8 border-amber-600 pr-4">
          <h1 className="text-3xl font-black text-slate-900">إدارة الموظفين</h1>
          <p className="text-gray-500">لوحة تحكم الكوادر البشرية - المتحف المصري الكبير</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-2xl shadow-lg font-bold transition transform hover:scale-105 cursor-pointer border-none outline-none text-sm"
        >
          + إضافة موظف جديد
        </button>
      </div>

      {/* Staff Grid - تصميم البطاقات الـ 3 أعمدة الأصلي الخاص بك */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff.map((member, index) => {
          const fullNameValue = member.fullName || member.FullName || "موظف بدون اسم";
          const positionValue = member.position || member.Position || "كادر إداري";
          const emailValue = member.email || member.Email || "لا يوجد بريد";
          const sectionValue = member.sectionId || member.SectionId || "غير محدد";
          const sId = member.staffId || member.StaffId || index + 1;

          return (
            <div key={sId} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl text-amber-700 font-bold">
                  {fullNameValue.charAt(0)}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(member)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition bg-none border-none cursor-pointer text-base">✏️</button>
                  <button onClick={() => handleDelete(sId)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition bg-none border-none cursor-pointer text-base">🗑️</button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">{fullNameValue}</h3>
              <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-4">{positionValue}</p>
              <div className="space-y-2 border-t pt-4 text-sm text-gray-500">
                <div className="flex items-center"><span className="ml-2">📧</span> {emailValue}</div>
                <div className="flex items-center"><span className="ml-2">🏛️</span> القسم الداخلي: {sectionValue}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* حالة خلو جدول السيرفر تماماً من البيانات */}
      {staff.length === 0 && (
        <p className="text-center py-16 text-xs font-bold text-slate-400 italic font-cairo">
          لا يوجد أي موظفين مسجلين حالياً في قاعدة البيانات الحقيقية... يرجى الضغط بالأعلى للإضافة
        </p>
      )}

      {/* Modal - إضافة وتعديل بتصميمك الصافي الأصلي */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl text-right">
            <h2 className="text-2xl font-black mb-6 text-slate-900">{editId ? 'تعديل البيانات الحية' : 'إضافة موظف جديد'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">الاسم بالكامل</label>
                <input 
                  type="text" required value={formData.fullName}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold text-sm"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="أحمد علي حسن"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">البريد الإلكتروني (يجب gmail أو yahoo)</label>
                <input 
                  type="email" required value={formData.email}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold text-sm text-left"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="staff@gmail.com"
                />
              </div>

              {/* حقل كلمة المرور المعتمد والإلزامي حسب متطلبات الـ Schema */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">كلمة المرور للموظف</label>
                <input 
                  type="password" required={!editId} value={formData.passwordHash}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold text-sm text-left"
                  onChange={(e) => setFormData({...formData, passwordHash: e.target.value})}
                  placeholder="********"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">المسمى الوظيفي</label>
                <input 
                  type="text" value={formData.position || ''}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold text-sm"
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  placeholder="مرشد سياحي / مرمم آثار"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-2">رقم القسم الداخلي (Section ID)</label>
                <input 
                  type="number" value={formData.sectionId || ''}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold text-sm text-center"
                  onChange={(e) => setFormData({...formData, sectionId: e.target.value})}
                  placeholder="1"
                  min="1"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 bg-amber-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-700 transition border-none cursor-pointer text-sm">حفظ وتأكيد</button>
                <button type="button" onClick={closeModal} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold border-none cursor-pointer hover:bg-gray-200">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
