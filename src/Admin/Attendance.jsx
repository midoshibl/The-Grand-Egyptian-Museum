import React, { useEffect, useState } from 'react';
import { attendanceService } from '../services/attendanceService';
import { getAllStaff } from '../services/staffService';

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ staffId: '', checkIn: new Date().toISOString().slice(0, 16) });

  const loadData = async () => {
    setLoading(true);
    try {
      const [attendanceData, staffData] = await Promise.all([
        attendanceService.getAll(),
        getAllStaff()
      ]);
      setRecords(attendanceData);
      setStaffList(staffData);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await attendanceService.add(formData);
      alert("تم تسجيل الحضور");
      setIsModalOpen(false);
      loadData();
    } catch (err) { alert("خطأ في التسجيل"); }
  };

  const handleCheckOut = async (staffId) => {
    try {
      await attendanceService.checkOut(staffId);
      alert("تم الانصراف");
      loadData();
    } catch (err) { alert("فشل تسجيل الانصراف"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف السجل؟")) {
      try {
        await attendanceService.delete(id);
        setRecords(records.filter(r => r.attendanceId !== id));
      } catch (err) { alert("فشل الحذف"); }
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "---";
    return new Date(dateStr).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="p-20 text-center font-bold">جاري تحميل سجلات الحضور...</div>;

  return (
    <div className="p-[120px] bg-gray-50 min-h-screen font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-800 border-r-8 border-indigo-600 pr-4">الحضور والانصراف</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl shadow-lg font-bold hover:bg-indigo-700 transition">
          + تسجيل حضور يدوي
        </button>
      </div>

      <div className="bg-white rounded-2rem shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-600 uppercase text-sm">
            <tr>
              <th className="p-6">الموظف</th>
              <th className="p-6 text-center">حضور</th>
              <th className="p-6 text-center">انصراف</th>
              <th className="p-6 text-center">الإجراء</th>
              <th className="p-6 text-center">حذف</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {records.map((record) => (
              <tr key={record.attendanceId} className="hover:bg-indigo-50/30 transition">
                <td className="p-6 font-bold text-slate-800">{record.staff?.fullName}</td>
                <td className="p-6 text-center text-indigo-600 font-mono font-bold">{formatTime(record.checkIn)}</td>
                <td className="p-6 text-center text-red-400 font-mono font-bold">{formatTime(record.checkOut)}</td>
                <td className="p-6 text-center">
                  {!record.checkOut ? (
                    <button onClick={() => handleCheckOut(record.staffId)} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-red-600 transition">انصراف 🚪</button>
                  ) : <span className="text-gray-400 text-xs">مكتمل</span>}
                </td>
                <td className="p-6 text-center">
                  <button onClick={() => handleDelete(record.attendanceId)} className="text-gray-300 hover:text-red-500 transition">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2rem p-10 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">تسجيل حضور</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select required className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, staffId: e.target.value})}>
                <option value="">-- اختر الموظف --</option>
                {staffList.map(s => <option key={s.staffId} value={s.staffId}>{s.fullName}</option>)}
              </select>
              <input type="datetime-local" required value={formData.checkIn} className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFormData({...formData, checkIn: e.target.value})} />
              <div className="flex gap-4 mt-6">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg">تأكيد</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-3 rounded-xl font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
