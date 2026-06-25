import React, { useEffect, useState } from 'react';
import api from '../api/api'; 

const AdminAttendance = () => {
  const [records, setRecords] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ staffId: '', checkIn: new Date().toISOString().slice(0, 16) });

  const loadData = async () => {
    try {
      const [attendanceRes, staffRes] = await Promise.all([
        api.get("/api/Admin/attendance"),
        api.get("/api/Admin/staff")
      ]);
      setRecords(attendanceRes.data?.data || attendanceRes.data?.Data || attendanceRes.data || []);
      setStaffList(staffRes.data?.Data || staffRes.data?.data || []);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { 
    loadData(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/Admin/attendance", {
        attendanceId: 0,
        staffId: Number(formData.staffId),
        checkIn: new Date(formData.checkIn).toISOString(),
        checkOut: null
      });
      alert("تم تسجيل الحضور بنجاح ✅");
      setIsModalOpen(false);
      setFormData({ staffId: '', checkIn: new Date().toISOString().slice(0, 16) });
      loadData();
    } catch (err) { 
      alert("خطأ في السيرفر ❌"); 
    }
  };

  const handleCheckOut = async (staffId) => {
    try {
      await api.put(`/api/Admin/attendance/checkout/${Number(staffId)}`);
      alert("تم تسجيل الانصراف بنجاح ✅");
      loadData();
    } catch (err) { 
      alert("فشل العملية ❌"); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذا السجل؟")) {
      try {
        await api.delete(`/api/Admin/attendance/${Number(id)}`);
        alert("تم الحذف بنجاح ✅");
        loadData();
      } catch (err) { 
        alert("فشل الحذف ❌"); 
      }
    }
  };

  // دالتك الأصلية الشغالة تمام والمطابقة للباك إند 100%
  const formatTime = (dateStr) => {
    if (!dateStr || dateStr === "string") return "---";
    try {
      const dateObj = new Date(dateStr);
      const hours = String(dateObj.getUTCHours()).padStart(2, '0');
      const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return "---";
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-xl font-cairo text-slate-700">جاري سحب تقارير البصمة...</div>;

  return (
    <div className="p-[120px] bg-gray-50 min-h-screen font-sans text-right" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-800 border-r-8 border-indigo-600 pr-4">لوحة الحضور العام للأدمن</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl shadow-lg font-bold border-none cursor-pointer text-sm">
          + تسجيل حضور يدوي
        </button>
      </div>

      <div className="bg-white rounded-2rem shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50 text-slate-600 uppercase text-sm font-black">
              <tr>
                <th className="p-6">الموظف المسؤول</th>
                <th className="p-6 text-center">حضور</th>
                <th className="p-6 text-center">انصراف</th>
                <th className="p-6 text-center">الإجراء</th>
                <th className="p-6 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-bold text-slate-700">
              {records.map((record, index) => {
                const staffObj = record.staff || record.Staff;
                const staffName = staffObj?.fullName || staffObj?.FullName || record.staffName || `موظف رقم (${record.staffId || index + 1})`;
                
                return (
                  <tr key={record.attendanceId || index} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-6 font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-700 text-xs font-black">{staffName.charAt(0)}</div>
                      <span>{staffName}</span>
                    </td>
                    <td className="p-6 text-center text-indigo-600 font-mono font-bold">{formatTime(record.checkIn || record.CheckIn)}</td>
                    <td className="p-6 text-center text-red-400 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded-lg ${!(record.checkOut || record.CheckOut) ? 'bg-amber-100 text-amber-800 text-[11px]' : ''}`}>
                        {formatTime(record.checkOut || record.CheckOut)}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      {!(record.checkOut || record.CheckOut) ? (
                        <button onClick={() => handleCheckOut(record.staffId || record.StaffId)} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-red-600 border-none cursor-pointer">انصراف 🚪</button>
                      ) : (
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-black">مكتمل</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      <button onClick={() => handleDelete(record.attendanceId || record.AttendanceId)} className="text-gray-300 hover:text-red-500 transition bg-none border-none cursor-pointer text-lg">🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2rem p-10 w-full max-w-md shadow-2xl text-right">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 border-r-4 border-indigo-600 pr-2">تسجيل حضور يدوي بالنظام</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 mr-1">اختيار الموظف</label>
                <select 
                  required 
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold text-sm bg-white" 
                  onChange={(e) => setFormData({...formData, staffId: e.target.value})}
                  value={formData.staffId}
                >
                  <option value="">-- اختر الموظف --</option>
                  {staffList.map(s => (
                    <option key={s.staffId || s.StaffId} value={s.staffId || s.StaffId}>{s.fullName || s.FullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 mr-1">تحديد التاريخ والوقت</label>
                <input type="datetime-local" required value={formData.checkIn} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold text-sm text-center" onChange={(e) => setFormData({...formData, checkIn: e.target.value})} />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg border-none cursor-pointer hover:bg-indigo-700 text-sm">تأكيد</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-3.5 rounded-xl font-bold border-none cursor-pointer hover:bg-gray-200 text-sm">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;
