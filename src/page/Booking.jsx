import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [ticketGroups, setTicketGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات الحجز المختار
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // بيانات الزائر (للمطابقة مع السيرفر)
  const [visitorData, setVisitorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [slotsData, menuData] = await Promise.all([
          bookingService.getAvailableSlots(),
          bookingService.getTicketMenu()
        ]);
        setSlots(slotsData);
        setTicketGroups(menuData);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    loadData();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...visitorData,
      nationality: selectedTicket.categoryName.includes("مصري") ? "Egyptian" : "Foreigner",
      selectedTimeSlot: selectedSlot,
      priceId: selectedTicket.priceId,
      quantity: 1,
      visitDate: new Date().toISOString().split('T')[0] // تنسيق YYYY-MM-DD
    };

    try {
      await bookingService.submitBooking(payload);
      alert("تم الحجز بنجاح! تفضل بزيارة المتحف في موعدك ✅");
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ: تأكد من بيانات الحساب المسجل");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-amber-700 animate-pulse">جاري تحضير التذاكر...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <form onSubmit={handleBookingSubmit} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* العمود الأيمن: اختيار التذاكر وبيانات الزائر */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. بيانات الزائر (مهمة للـ 401 Unauthorized) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">👤</span> بيانات تأكيد الحجز
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="الاسم الأول" required
                className="p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => setVisitorData({...visitorData, firstName: e.target.value})}
              />
              <input 
                type="text" placeholder="الاسم الأخير" required
                className="p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => setVisitorData({...visitorData, lastName: e.target.value})}
              />
              <input 
                type="email" placeholder="البريد الإلكتروني المسجل" required
                className="p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => setVisitorData({...visitorData, email: e.target.value})}
              />
              <input 
                type="password" placeholder="كلمة المرور" required
                className="p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => setVisitorData({...visitorData, password: e.target.value})}
              />
            </div>
          </div>

          {/* 2. قائمة التذاكر */}
          {ticketGroups.map((group, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-black text-amber-600 mb-6 tracking-wide">تذاكر {group.groupName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.options.map((opt) => (
                  <div 
                    key={opt.priceId}
                    onClick={() => setSelectedTicket(opt)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedTicket?.priceId === opt.priceId ? 'border-amber-600 bg-amber-50' : 'border-slate-50 bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-slate-800 mb-1">{opt.categoryName}</p>
                    <p className="text-amber-700 font-black">{opt.price} ج.م</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* العمود الأيسر: المواعيد والملخص */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black mb-6">🕒 الموعد</h2>
            <div className="grid grid-cols-1 gap-2">
              {slots.map((s, i) => (
                <button 
                  key={i} type="button"
                  onClick={() => setSelectedSlot(s)}
                  className={`p-3 rounded-xl font-bold text-sm transition-all ${selectedSlot === s ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-600 rounded-3xl p-8 text-white shadow-xl shadow-amber-200">
            <h3 className="text-xl font-black mb-4 border-b border-amber-500 pb-4 text-center">تأكيد الحجز</h3>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between"><span>الفئة:</span> <span className="font-bold">{selectedTicket?.priceId ? 'مختارة' : '---'}</span></div>
              <div className="flex justify-between"><span>الموعد:</span> <span className="font-bold">{selectedSlot || '---'}</span></div>
              <div className="flex justify-between text-xl font-black border-t border-amber-500 pt-4">
                <span>الإجمالي:</span> <span>{selectedTicket?.price || 0} ج.م</span>
              </div>
            </div>
            <button 
              disabled={!selectedSlot || !selectedTicket || !visitorData.email}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-white hover:text-amber-700 transition-all disabled:opacity-50"
            >
              إتمام الحجز الآن 🎟️
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Booking;
