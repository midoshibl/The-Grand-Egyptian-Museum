import React, { useEffect, useState } from "react";
import { Calendar, Users, Clock } from "lucide-react";
import api from "../api/api"; // ليلتصق توكن الأدمن تلقائياً بالطلب

export default function AdminAttendanceLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب سجل الحضور العام لكل موظفي المتحف من الباك إند
  useEffect(() => {
    // 💡 هنا تضع رابط الـ GET الخاص بالأدمن لجلب سجل الحضور العام (لو متوفر في السواجر)
    api.get("/api/Admin/attendance-log") 
      .then((res) => {
        setLogs(res.data?.data || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching attendance logs:", err);
        // داتا تجريبية صافية فقط لكي لا تظهر الشاشة فارغة إذا كان السيرفر لسه مخلصش الـ Endpoint دي
        setLogs([
          { id: 1, staffName: "أحمد علي", date: "2026-06-18", checkIn: "08:30 AM", checkOut: "04:00 PM" },
          { id: 2, staffName: "محمد حسن", date: "2026-06-18", checkIn: "09:00 AM", checkOut: "قيد الدوام ⏱️" },
          { id: 3, staffName: "محمود جابر", date: "2026-06-18", checkIn: "08:15 AM", checkOut: "04:15 PM" }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* الرأس */}
        <div className="border-r-4 border-purple-600 pr-3 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">سجلات الحضور العام للكوادر</h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">لوحة رقابة ومتابعة توقيتات تبصيم موظفي المتحف المصري الكبير</p>
        </div>

        {/* جدول السجلات المتجاوب - يتحول لكروت في الموبايل ولجدول فخم في اللابتوب */}
        <div className="bg-white rounded-2rem shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs md:text-sm font-black">
                  <th className="p-4 md:p-5">اسم الموظف</th>
                  <th className="p-4 md:p-5">التاريخ</th>
                  <th className="p-4 md:p-5">بصمة الحضور</th>
                  <th className="p-4 md:p-5">بصمة الانصراف</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-slate-700 divide-y divide-slate-100">
                {logs.map((log, index) => (
                  <tr key={log.id || index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 md:p-5 flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-purple-700 text-xs font-black">{log.staffName?.charAt(0)}</div>
                      <span className="text-slate-900">{log.staffName}</span>
                    </td>
                    <td className="p-4 md:p-5 font-mono text-xs text-slate-500">{log.date || log.taskDate || "2026-06-18"}</td>
                    <td className="p-4 md:p-5 text-emerald-600 font-mono">{log.checkIn || "08:00 AM"}</td>
                    <td className="p-4 md:p-5 font-mono">
                      <span className={`px-2.5 py-1 rounded-lg text-xs ${log.checkOut?.includes("قيد") ? 'bg-amber-100 text-amber-800' : 'text-blue-600 bg-blue-50'}`}>
                        {log.checkOut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
