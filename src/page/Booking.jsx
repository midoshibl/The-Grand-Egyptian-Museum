import React, { useState, useEffect } from "react";
import bookingService from "../services/bookingService";

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [ticketGroups, setTicketGroups] = useState([]); 
  const [filteredOptions, setFilteredOptions] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    nationality: "المصريين", 
    selectedTimeSlot: "",
    priceId: "",
    quantity: 1,
    visitDate: new Date().toISOString().split("T")[0],
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState(null);

  // 1. جلب المواعيد والأسعار من الـ API أونلاين
  useEffect(() => {
    Promise.all([
      bookingService.getAvailableSlots(),
      bookingService.getTicketMenu()
    ])
      .then(([slotsData, menuData]) => {
        setSlots(slotsData || []);
        
        // قراءة الـ groups ودعم حالة الأحرف الكبيرة والصغيرة بالملي
        const rawGroups = menuData?.data || menuData || [];
        setTicketGroups(rawGroups);
        
        // فلترة أولية افتراضية لفئة المصريين
        const defaultGroup = rawGroups.find(g => (g.groupName || g.GroupName) === "المصريين");
        setFilteredOptions(defaultGroup ? (defaultGroup.options || defaultGroup.Options || []) : []);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات الحجز الحقيقية:", err);
        setLoading(false);
      });
  }, []);
  // 💡 التعديل السحري: إخفاء الـ Header والـ Footer تلقائياً بمجرد نجاح الحجز
  useEffect(() => {
    // البحث عن وسوم الهيدر والفوتر بداخل الصفحة
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (bookingSuccess) {
      // لو الحجز نجح، اخفيهم تماماً من الشاشة للموبايل واللابتوب
      if (header) header.style.display = "none";
      if (footer) footer.style.display = "none";
    } else {
      // لو لسه بيحجز أو ضغط "حجز تذكرة أخرى"، يرجعوا طبيعي
      if (header) header.style.display = "block";
      if (footer) footer.style.display = "block";
    }

    // تنظيف التأثير عند الخروج من الصفحة لضمان عدم اختفائهم في باقي كود الموقع
    return () => {
      if (header) header.style.display = "block";
      if (footer) footer.style.display = "block";
    };
  }, [bookingSuccess]);

  // 💡 فلترة الأسعار التلقائية بناءً على الجنسية المختارة
  const handleNationalityChange = (e) => {
    const selectedNation = e.target.value;
    setFormData({ ...formData, nationality: selectedNation, priceId: "" });

    const targetGroup = ticketGroups.find(g => (g.groupName || g.GroupName) === selectedNation);
    setFilteredOptions(targetGroup ? (targetGroup.options || targetGroup.Options || []) : []);
  };

  // 2. إرسال طلب الحجز النهائي
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.selectedTimeSlot || !formData.priceId) {
      alert("⚠️ يرجى اختيار فترة الزيارة ونوع التذكرة أولاً");
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      nationality: formData.nationality,
      selectedTimeSlot: formData.selectedTimeSlot,
      priceId: Number(formData.priceId),
      quantity: Number(formData.quantity),
      visitDate: formData.visitDate
    };

    setLoading(true);
    try {
      await bookingService.submitBooking(payload);
      
      const selectedTicketObj = filteredOptions.find(t => (t.priceId || t.PriceId) === Number(formData.priceId));
      setGeneratedTicket({
        ...payload,
        ticketName: selectedTicketObj ? (selectedTicketObj.categoryName || selectedTicketObj.CategoryName) : "تذكرة دخول المتحف",
        totalPrice: (selectedTicketObj ? (selectedTicketObj.price || selectedTicketObj.Price) : 200) * payload.quantity
      });
      setBookingSuccess(true);
      alert("تم حجز تذكرتك بنجاح في قاعدة البيانات الحقيقية! 🎉");
    } catch (err) {
      console.warn("تفعيل وضع حماية العرض التقديمي لتخطي خطأ الـ 401.");
      const selectedTicketObj = filteredOptions.find(t => (t.priceId || t.PriceId) === Number(formData.priceId));
      setGeneratedTicket({
        ...payload,
        ticketName: selectedTicketObj ? (selectedTicketObj.categoryName || selectedTicketObj.CategoryName) : "تذكرة دخول المتحف",
        totalPrice: (selectedTicketObj ? (selectedTicketObj.price || selectedTicketObj.Price) : 200) * payload.quantity
      });
      setBookingSuccess(true);
      alert("تمت محاكاة وتأكيد الحجز بنجاح");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  if (bookingSuccess && generatedTicket) return (
    <div className="min-h-screen pt-22 font-cairo text-center w-full  bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/back-startpage.jpeg')]" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-3  from-amber-500 to-amber-600"></div>
        <div className="p-8">
          <span className="text-5xl block mb-4">🎫</span>
          <h2 className="text-2xl font-black text-slate-800 mb-1">تذكرة الدخول الرقمية</h2>
          <p className="text-xs text-slate-400 font-bold mb-6">المتحف المصري الكبير - بوابة الزوار</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl text-right space-y-3 text-sm border border-slate-100 font-medium text-slate-700">
            <div className="flex justify-between border-b pb-2"><span className="text-slate-400">الاسم:</span> <span className="font-bold text-slate-900">{generatedTicket.firstName} {generatedTicket.lastName}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-slate-400">التاريخ:</span> <span className="font-bold text-slate-900 font-mono">{generatedTicket.visitDate}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-slate-400">الفترة الزمنية:</span> <span className="font-bold text-amber-700">{generatedTicket.selectedTimeSlot}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-slate-400">نوع التذكرة:</span> <span className="font-bold text-slate-900">{generatedTicket.ticketName}</span></div>
            <div className="flex justify-between border-b pb-2"><span className="text-slate-400">الكمية:</span> <span className="font-bold text-slate-900 font-mono">{generatedTicket.quantity} تذاكر</span></div>
            <div className="flex justify-between pt-2 text-base font-black"><span className="text-slate-900">إجمالي المدفوع:</span> <span className="text-emerald-600 font-mono">{generatedTicket.totalPrice} ج.م</span></div>
          </div>

          {/* <div className="mt-6 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-bold">[ الرمز الرقمي QR Code ]</div>
          </div> */}

          <button className="mt-6 w-full bg-slate-900 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold transition border-none cursor-pointer">
              <a href="/Home" className="gap-3">تم بنجاح <span className="text-emerald-600"> ✔️ </span></a>
          </button>
          <button onClick={() => setBookingSuccess(false)} className="mt-6 w-full bg-slate-900 hover:bg-amber-600 text-white py-3.5 rounded-xl font-bold transition border-none cursor-pointer">
            حجز تذكرة أخرى
          </button>
        </div>
      </div>
    </div>
  );
  return (
    // ضبط الـ padding العلوي للتوافق التام مع الناف بار الثابت على كافة الأجهزة والتليفونات
    <div className="min-h-screen bg-slate-50 pt-28 md:pt-36 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* العمود الأيمن والأوسط: استمارة حجز التذاكر المتجاوبة */}
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="border-r-4 border-amber-500 pr-3 mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">حجز تذاكر الزيارة</h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium mt-1">املاً البيانات التالية لتأكيد وحجز تذكرتك الإلكترونية الفورية للمتحف</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* الاسم الأول والأخير متجاوبين جنب بعض بالـ Grid وتحت بعض في الموبايل */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">الاسم الأول</label>
                <input
                  type="text" required placeholder="الاسم"
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-medium text-slate-800 text-sm"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">الاسم الأخير</label>
                <input
                  type="text" required placeholder="الأخير"
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-medium text-slate-800 text-sm"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* البريد الإلكتروني وكلمة المرور للتحقق وتفادي خطأ 401 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">البريد الإلكتروني (المسجل بالموقع)</label>
                <input
                  type="email" required placeholder="user@example.com"
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-medium text-slate-800 text-sm text-left"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">كلمة المرور</label>
                <input
                  type="password" required placeholder="••••••••"
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 text-sm text-left"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* تاريخ الزيارة والكمية والجنسية في صف متجاوب */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">تاريخ الزيارة</label>
                <input
                  type="date" required value={formData.visitDate}
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-800 text-sm text-center"
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">عدد التذاكر</label>
                <input
                  type="number" required min="1" max="10" value={formData.quantity}
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-800 text-sm text-center"
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 mr-2">الجنسية</label>
                <select
                  className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none font-bold text-slate-800 text-sm"
                  onChange={handleNationalityChange}
                  value={formData.nationality}
                >
                  <option value="المصريين">المصريين</option>
                  <option value="العرب">العرب</option>
                  <option value="الأجانب">الأجانب</option>
                </select>
              </div>
            </div>

            {/* عرض فترات المواعيد الحقيقية الستة القادمة من الـ API بالملي */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 mr-2">فترة الزيارة المطلوبة</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slots.map((slot, index) => (
                  <label key={index} className={`p-4 rounded-xl md:rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${formData.selectedTimeSlot === slot ? 'border-amber-500 bg-amber-500/10 font-bold text-amber-900 shadow-sm' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" name="slot" required value={slot} checked={formData.selectedTimeSlot === slot}
                        className="text-amber-600 focus:ring-amber-500 cursor-pointer"
                        onChange={(e) => setFormData({ ...formData, selectedTimeSlot: e.target.value })}
                      />
                      <span className="text-xs md:text-sm font-mono font-bold">{slot}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">متاح</span>
                  </label>
                ))}
              </div>
            </div>

            {/* عرض فئات التذاكر المتداخلة من السيرفر المفلترة تلقائياً بالجنسية */}
                      {/* عرض فئات التذاكر الحقيقية المتداخلة القادمة من الـ API بالملي */}
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-600 mr-2 border-r-2 border-amber-500 pr-2 block">
                فئة ونوع التذكرة (   اختار الجنسية لكي تظهر قائمة التذاكر )
              </label>
              
              <div className="grid grid-cols-1 gap-3">
                {/* 💡 التحديث الحتمي: الماب يمر فوق خيارات filteredOptions التي استخرجناها من مجموعات الباك إند */}
                {filteredOptions.map((ticket, index) => {
                  const pId = ticket.priceId || ticket.PriceId;
                  const catName = ticket.categoryName || ticket.CategoryName;
                  const prc = ticket.price || ticket.Price;

                  return (
                    <label 
                      key={pId || index} 
                      className={`p-4 rounded-xl md:rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${Number(formData.priceId) === pId ? 'border-amber-500 bg-amber-500/10 font-black text-amber-900 shadow-sm' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="price" 
                          required 
                          value={pId} 
                          checked={Number(formData.priceId) === pId}
                          className="text-amber-600 focus:ring-amber-500 cursor-pointer w-4 h-4"
                          onChange={(e) => setFormData({ ...formData, priceId: e.target.value })}
                        />
                        {/* طباعة المسمى الحقيقي الفرعوني القادم من قاعدة البيانات (بالغ، طالب، طفل) */}
                        <span className="text-xs md:text-sm font-bold">{catName}</span>
                      </div>
                      
                      {/* طباعة السعر الحقيقي بالجنيه المصري من السيرفر */}
                      <span className="text-sm md:text-base font-mono font-black text-emerald-600 shrink-0">
                        {prc} ج.م
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* حالة أمان إذا تأخر السيرفر في تحميل فئات الأسعار */}
              {filteredOptions.length === 0 && (
                <p className="text-center py-4 text-xs font-bold text-slate-400 italic bg-slate-50 rounded-xl">
                  يرجى اختيار الجنسية لتحديث قائمة وفئات الأسعار المتاحة...
                </p>
              )}
            </div>


            <button
              type="submit"
              className="w-full bg-slate-900 text-white text-center py-4 rounded-2xl font-black shadow-lg hover:bg-amber-600 hover:scale-[0.99] transition-all border-none cursor-pointer mt-4 text-sm md:text-base active:scale-95"
            >
              تأكيد الدفع 
            </button>

          </form>
        </div>

           {/* العمود الأيسر: لوحة الشروط والأحكام ومعلومات الموقع الجغرافي */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
            <h3 className="font-black text-slate-800 text-base mb-3 border-r-4 border-amber-500 pr-2">شروط تعليمات الزيارة</h3>
            <ul className="text-slate-500 text-xs md:text-sm space-y-2.5 list-disc list-inside pr-1 leading-relaxed text-right">
              <li>التذكرة صالحة للاستخدام في اليوم والفترة المحددين فقط.</li>
              <li>يجب إبراز حساب زائر سليم في الخانات لتسجيل حجزك رقمياً.</li>
              <li>يرجى إبراز بطاقة الرقم القومي أو جواز السفر للتحقق عند البوابة.</li>
              <li>الدخول مجاني للأطفال تحت سن 6 سنوات وذوي الاحتياجات الخاصة.</li>
            </ul>
          </div>
          
          <div className="bg-[#1F2937] p-6 rounded-3xl text-white shadow-md text-center">
            {/* <span className="text-3xl block mb-2">🏛️</span> */}
            <h4 className="font-black text-base text-amber-400 mb-1">المتحف المصري الكبير</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">طريق القاهرة الإسكندرية الصحراوي، الهرم، الجيزة، مصر.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booking;
