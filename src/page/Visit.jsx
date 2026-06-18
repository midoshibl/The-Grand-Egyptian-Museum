import header from "../assets/images/back-startpage.jpeg";
import {
  DoorOpen,
  DoorClosed,
  CalendarCheck,
  Users,
  Ticket,
  Clock2,
  Accessibility,
  Sun,
  Moon,
  CalendarX,
  TicketsIcon,
  MapPin,
} from "lucide-react";

function Visit() {
  return (
    <div className="pt-[105px] bg-slate-50 min-h-screen font-cairo" dir="rtl">
      
      {/* 1. قسم البانر العلوي (Hero Banner) */}
      <section className="h-[350px] md:h-[500px] relative overflow-hidden">
        <img
          src={header}
          alt="Visit timing"
          className="w-full h-full object-cover object-top"
        />
        <div className="text-center w-full absolute inset-0 bg-black/60 flex flex-col p-4 justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">أوقات الزيارة</h1>
          <p className="text-[#E5E7EB] text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
            نرحب بكم في المتحف الوطني. تعرف على أوقات العمل والزيارة لتخطط
            لرحلتك الثقافية بأفضل شكل ممكن
          </p>
        </div>
      </section>

      {/* 2. قسم أوقات العمل الرسمية */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-[#1F2937] mb-2">أوقات العمل الرسمية</h2>
          <p className="text-sm md:text-lg text-[#4B5563]">
            المتحف مفتوح يومياً للزوار من جميع أنحاء العالم
          </p>
        </div>

        {/* الكروت الثلاثة: مرنة وعامودية في الموبايل وجنب بعضها في اللابتوب */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* كارت وقت الافتتاح */}
          <div className="bg-[#BBF7D0] p-6 flex flex-col justify-center items-center space-y-4 rounded-3xl shadow-sm border border-emerald-200">
            <span className="bg-[#16A34A] p-2.5 rounded-full text-white">
              <DoorOpen size={24} />
            </span>
            <h3 className="text-[#374151] font-bold text-base md:text-lg">وقت الافتتاح</h3>
            <p className="text-[#15803D] text-2xl md:text-3xl font-black">
              09:00 صباحاً
            </p>
          </div>

          {/* كارت وقت الإغلاق */}
          <div className="bg-[#BFDBFE] p-6 flex flex-col justify-center items-center space-y-4 rounded-3xl shadow-sm border border-blue-200">
            <span className="bg-[#2563EB] p-2.5 rounded-full text-white">
              <DoorClosed size={24} />
            </span>
            <h3 className="text-[#374151] font-bold text-base md:text-lg">وقت الإغلاق</h3>
            <p className="text-[#1D4ED8] text-2xl md:text-3xl font-black">
              07:00 مساءً
            </p>
          </div>

          {/* كارت حالة المتحف */}
          <div className="bg-[#E9D5FF] p-6 flex flex-col justify-center items-center space-y-4 rounded-3xl shadow-sm border border-purple-200">
            <span className="bg-[#9333EA] p-2.5 rounded-full text-white">
              <CalendarCheck size={24} />
            </span>
            <h3 className="text-[#374151] font-bold text-base md:text-lg">حالة المتحف</h3>
            <div className="text-[#15803D] text-lg md:text-xl font-black flex items-center gap-3 bg-[#BBF7D0] rounded-2xl px-5 py-2 border border-emerald-300">
              <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse"></span>
              <span>مفتوح يومياً</span>
            </div>
          </div>

        </div>

        {/* 3. لوحة معلومات إضافية متجاوبة بدون أبعاد ثابتة */}
        <div className="bg-[#E5E7EB] max-w-5xl mx-auto p-6 md:p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-[#1F2937] text-center mb-8">معلومات إضافية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
            
            <div className="text-sm md:text-base flex gap-4 text-right w-full bg-white/80 p-4 rounded-2xl">
              <span className="p-3 rounded-xl bg-[#FFEDD5] text-[#EA580C] h-fit"><Users size={22} /></span>
              <div>
                <h4 className="font-bold text-[#1F2937]">أوقات الذروة</h4>
                <p className="text-[#4B5563] text-xs md:text-sm mt-1">10:00 ص - 2:00 م | 4:00 م - 6:00 م</p>
              </div>
            </div>

            <div className="text-sm md:text-base flex gap-4 text-right w-full bg-white/80 p-4 rounded-2xl">
              <span className="p-3 rounded-xl bg-[#BBF7D0] text-[#15803D] h-fit"><Ticket size={22} /></span>
              <div>
                <h4 className="font-bold text-[#1F2937]">آخر موعد لبيع التذاكر</h4>
                <p className="text-[#4B5563] text-xs md:text-sm mt-1">5:00 مساءً</p>
              </div>
            </div>

            <div className="text-sm md:text-base flex gap-4 text-right w-full bg-white/80 p-4 rounded-2xl">
              <span className="p-3 rounded-xl bg-[#BFDBFE] text-[#2563EB] h-fit"><Clock2 size={22} /></span>
              <div>
                <h4 className="font-bold text-[#1F2937]">مدة الزيارة المقترحة</h4>
                <p className="text-[#4B5563] text-xs md:text-sm mt-1">2-3 ساعات للجولة الكاملة</p>
              </div>
            </div>

            <div className="text-sm md:text-base flex gap-4 text-right w-full bg-white/80 p-4 rounded-2xl">
              <span className="p-3 rounded-xl bg-[#E9D5FF] text-[#9333EA] h-fit"><Accessibility size={22} /></span>
              <div>
                <h4 className="font-bold text-[#1F2937]">إمكانية الوصول</h4>
                <p className="text-[#4B5563] text-xs md:text-sm mt-1">متاح لذوي الاحتياجات الخاصة</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. قسم أوقات خاصة ومناسبات عطل وفترات رمضان */}
      <section className="bg-[#E5E7EB] py-12 px-4 text-center">
        <h2 className="text-[#1F2937] text-2xl md:text-3xl font-black mb-8">
          أوقات خاصة ومناسبات
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 flex flex-col justify-center items-center bg-white rounded-2xl shadow-sm">
            <span className="bg-[#FEF9C3] text-[#CA8A04] p-3 rounded-full"><Sun size={24} /></span>
            <h3 className="text-[#1F2937] text-lg font-bold mt-4 mb-2">عطلة نهاية الأسبوع</h3>
            <div className="text-sm space-y-2 text-[#4B5563]">
              <p className="font-bold text-slate-800">الجمعة والسبت</p>
              <p>09:00 ص - 08:00 م</p>
              <p className="text-[#166534] text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded">ساعات إضافية</p>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-center items-center bg-white rounded-2xl shadow-md border border-amber-400/30">
            <span className="bg-[#E0E7FF] text-[#4F46E5] p-3 rounded-full"><Moon size={24} /></span>
            <h3 className="text-[#1F2937] text-lg font-bold mt-4 mb-2">شهر رمضان</h3>
            <div className="text-sm space-y-2 text-[#4B5563]">
              <p className="font-bold text-slate-800">أوقات خاصة</p>
              <p>10:00 ص - 04:00 م</p>
              <p className="text-[#1E40AF] text-xs font-bold bg-blue-50 px-2 py-0.5 rounded">ساعات محدودة</p>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-center items-center bg-white rounded-2xl shadow-sm">
            <span className="bg-[#FEE2E2] text-[#DC2626] p-3 rounded-full"><CalendarX size={24} /></span>
            <h3 className="text-[#1F2937] text-lg font-bold mt-4 mb-2">العطل الرسمية</h3>
            <div className="text-sm space-y-2 text-[#4B5563]">
              <p className="font-bold text-slate-800">حسب التقويم الرسمي</p>
              <p>مغلق أو مواعيد خاصة</p>
              <p className="text-[#991B1B] text-xs font-bold bg-red-50 px-2 py-0.5 rounded">يرجى التأكد</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. قسم الدعوة للحجز السفلية المتجاوبة (Call To Action) */}
      <section className="bg-[#2563EB] py-12 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-4xl font-black">جاهز لزيارة المتحف؟</h2>
          <p className="text-sm md:text-lg text-[#F5F2ED]">
            احجز تذكرتك الآن واستمتع بتجربة ثقافية لا تُنسى
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/Booking"
              className="w-full sm:w-auto hover:bg-amber-600 font-bold transition-all text-base text-[#2563EB] bg-[#E5E7EB] px-8 py-3.5 rounded-xl flex gap-2 justify-center items-center shadow-lg"
            >
              <TicketsIcon size={18} /> احجز زيارتك الآن
            </a>
            <a
              href="https://maps.app.goo.gl/U7CJXKUhRBndRDEc7" target="_blank" rel="noreferrer"
              className="w-full sm:w-auto text-base text-[#E5E7EB] border border-[#E5E7EB] px-8 py-3 rounded-xl flex gap-2 justify-center items-center hover:bg-white/10 transition-colors"
            >
              <MapPin size={18} /> اعرض الموقع
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Visit;
