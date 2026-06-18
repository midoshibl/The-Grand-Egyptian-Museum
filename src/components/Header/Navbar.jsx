import logo_nav from "../../assets/images/logo1.jpg";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, CircleUserRound, Search, Ticket, ChevronDown } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false); // لقائمة الموبايل الجانبية
  const [dropdownOpen, setDropdownOpen] = useState(false); // لقائمة الصفحات المنسدلة (لابتوب)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("User"); // الصلاحية الافتراضية للزائر

  // فحص حالة تسجيل الدخول لقراءة التوكن وحساب صلاحية الموظف أو الأدمن حقيقياً
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole"); // جلب الرول المخزن من صفحة الـ Login
    
    if (token && token !== "undefined" && token !== "string") {
      setIsLoggedIn(true);
      setRole(storedRole || "User");
    } else {
      setIsLoggedIn(false);
      setRole("User");
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("هل تريد تسجيل الخروج من النظام؟")) {
      localStorage.clear(); // مسح الجلسة والبصمة والتوكن بالكامل
      setIsLoggedIn(false);
      setOpen(false);
      window.location.href = "/loginPage"; // تحويل لصفحة تسجيل الدخول
    }
  };
  return (
    <>
      <header className="bg-[#FEFEFE] select-none fixed top-0 left-0 w-full z-49 backdrop-blur-md shadow font-cairo" dir="rtl">
        {/* العرض مرن تلقائياً ومحاذي لمنتصف الشاشة تماماً بدون خروج عن الحواف */}
        <nav className="container flex justify-between gap-2 text-amber-600 transition duration-300 h-[105px] mx-auto w-full max-w-7xl px-4 md:px-6 items-center">
          
          {/* Logo Section */}
          <a href="/home" className="logo flex gap-2 items-center shrink-0">
            <img src={logo_nav} alt="logo" className="w-[85px] md:w-[120px] bg-transparent" />
            <p className="font-black flex flex-col items-start text-[#1F2937] text-sm md:text-base leading-tight">
              المتحف المصري الكبير
              <span className="text-[10px] text-amber-600 font-medium tracking-widest">GRAND EGYPTIAN MUSEUM</span>
            </p>
          </a>

          {/* Desktop Navigation Links - مطابقة للـ Routes بالظبط بحروف صحيحة */}
          <ul className="hidden lg:flex items-center gap-6 text-right font-bold text-[#4B5563]">
            <li><a href="/home" className="hover:text-amber-500 transition">الرئيسية</a></li>
            <li><a href="/Artifacts" className="hover:text-amber-500 transition">القطع الأثرية</a></li>
            <li><a href="/MuseumHalls" className="hover:text-amber-500 transition">القاعات</a></li>
            <li><a href="/ExhibitionDetails" className="hover:text-amber-500 transition">المعارض المؤقتة</a></li>
            <li><a href="/Visit" className="hover:text-amber-500 transition">الزيارة</a></li>
            
            {/* القائمة المنسدلة الذكية - لابتوب */}
            <li className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-amber-500 transition font-bold cursor-pointer bg-none border-none p-0 text-[#4B5563] outline-none"
              >
                تصفح المزيد <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 z-50 text-sm">
                  <a href="/Conser" onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium">🔬 معامل ومراكز الترميم</a>
                  <a href="/Gardens" onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium">🌳 حدائق المتحف الخارجية</a>
                  <a href="/Search" onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium">🔍 محرك البحث الذكي</a>
                  <a href="/TheMuseum" onClick={() => setDropdownOpen(false)} className="block px-5 py-2.5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium">عن المتحف</a>
                  
                  {isLoggedIn && (
                    <>
                      {/* 💼 فئة الموظف (Staff) - لابتوب */}
                      {(role === "Staff" || role === "staff") && (
                        <>
                          <div className="border-t border-slate-100 my-2"></div>
                          <p className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">بوابة الموظف الرقمية</p>
                          <a href="/MyDashboard" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 text-amber-700 bg-amber-50/50 hover:bg-amber-100 font-black">⏱️ لوحة التحكم والبصمة</a>
                          <a href="/my-tasks" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 text-amber-700 bg-amber-50/50 hover:bg-amber-100 font-black">📋 جدول المهام والتكليفات</a>
                        </>
                      )}

                      {/* 👑 فئة المدير (Admin) - لابتوب */}
                      {(role === "Admin" || role === "admin") && (
                        <>
                          <div className="border-t border-slate-100 my-2"></div>
                          <p className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">إدارة السيستم (أدمن)</p>
                          <a href="/Staff" onClick={() => setDropdownOpen(false)} className="block px-5 py-1.5 text-slate-600 hover:text-amber-600 font-medium">👥 إدارة شؤون الموظفين</a>
                          <a href="/AdminAttendanceLog" onClick={() => setDropdownOpen(false)} className="block px-5 py-1.5 text-slate-600 hover:text-amber-600 font-medium">📅 سجلات الحضور العام</a>
                          <a href="/Tasks" onClick={() => setDropdownOpen(false)} className="block px-5 py-1.5 text-slate-600 hover:text-amber-600 font-medium">📝 لوحة التحكم بالوظائف</a>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
              {/* Desktop Right Actions */}
          <section className="hidden lg:flex px-2 text-black flex-row gap-3 xl:gap-4 items-center shrink-0">
            <a href="/Search" className="text-[#6B7280] hover:text-amber-500 transition p-2"><Search size={22} /></a>
            
            {/* 💡 التعديل: إخفاء أيقونة بوابة تسجيل الدخول تماماً إذا كان المستخدم مسجلاً بالفعل */}
            {!isLoggedIn && (
              <a href="/loginPage" className="text-[#6B7280] hover:text-amber-500 transition p-2"><CircleUserRound size={22} /></a>
            )}
            
            {/* زر حجز التذكرة يتحول ديناميكياً إلى "لوحة الإدارة" إذا كان المستخدم موظف أو أدمن */}
                       {/* 💡 التعديل الجوهري: توزيع الروابط والنصوص ديناميكياً حسب نوع الحساب الثلاثي */}
            <a 
              className="bg-[#D4AF37] text-white px-5 xl:px-6 py-3 rounded-2xl flex gap-2 font-bold items-center shadow hover:bg-amber-500 hover:scale-95 transition-all duration-200 no-underline shrink-0" 
              href={
                isLoggedIn && (role === "Admin" || role === "admin") ? "/MyDashboard" :
                isLoggedIn && (role === "Staff" || role === "staff") ? "/Attendance" : 
                "/Booking"
              }
            >
              {isLoggedIn && (role === "Admin" || role === "admin") ? (
                "لوحة الإدارة"
              ) : isLoggedIn && (role === "Staff" || role === "staff") ? (
                "تسجيل الحضور"
              ) : (
                <>احجز تذكرتك الآن <Ticket size={18} /></>
              )}
            </a>

            
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 p-2 cursor-pointer bg-none border-none outline-none"><LogOut size={22} /></button>
            )}
          </section>


                 {/* Mobile & Tablet Menu Icon */}
          <button
            className="lg:hidden text-amber-500 p-2 outline-none cursor-pointer bg-none border-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>


        {/* 📱 Mobile & Tablet Dropdown Overlay - مفصل بالكامل وحسب الصلاحيات للتليفون والتابلت */}
        {open && (
          <div className="lg:hidden bg-white w-full border-t border-slate-100 shadow-2xl absolute top-[105px] left-0 p-6 z-50 max-h-[80vh] overflow-y-auto" dir="rtl">
            <ul className="flex flex-col gap-5 text-right font-bold text-slate-700 text-base mb-6">
              <li><a href="/home" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">الرئيسية</a></li>
              <li><a href="/Artifacts" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">القطع الأثرية</a></li>
              <li><a href="/MuseumHalls" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">القاعات</a></li>
              <li><a href="/ExhibitionDetails" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">المعارض المؤقتة</a></li>
              <li><a href="/Visit" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">الزيارة</a></li>
              <li><a href="/Conser" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">🔬 معامل الترميم</a></li>
              <li><a href="/Gardens" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">🌳 حدائق المتحف</a></li>
              <li><a href="/Search" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">🔍 محرك البحث الذكي</a></li>
              <li><a href="/TheMuseum" onClick={() => setOpen(false)} className="block py-2 border-b border-slate-50 hover:text-amber-500 no-underline text-inherit">عن المتحف</a></li>
              
              {/* 💡 فلترة وحماية أزرار منيو الجوال بناءً على الصلاحيات الحقيقية */}
              {isLoggedIn && (
                <>
                  {/* أزرار تظهر في التليفون فقط للموظف (Staff) */}
                  {(role === "Staff" || role === "staff") && (
                    <>
                      <p className="text-[10px] font-bold text-slate-400 uppercase pt-2 tracking-wider">بوابة العمل (موظف)</p>
                      <li><a href="/MyDashboard" onClick={() => setOpen(false)} className="block py-2 text-amber-600 font-black border-b border-amber-50 bg-amber-50/30 px-3 rounded-xl no-underline">⏱️ البصمة ولوحة المتابعة</a></li>
                      <li><a href="/my-tasks" onClick={() => setOpen(false)} className="block py-2 text-amber-600 font-black border-b border-amber-50 bg-amber-50/30 px-3 rounded-xl no-underline">📋 المهام والتكليفات الحالية</a></li>
                    </>
                  )}

                  {/* أزرار تظهر في التليفون فقط للمدير (Admin) */}
                  {(role === "Admin" || role === "admin") && (
                    <>
                      <p className="text-[10px] font-bold text-slate-400 uppercase pt-2 tracking-wider">إداريات النظام (أدمن)</p>
                      <li><a href="/Staff" onClick={() => setOpen(false)} className="block py-2 text-slate-700 border-b border-slate-100 px-3 hover:text-amber-600 no-underline">• شؤون الموظفين</a></li>
                      <li><a href="/AdminAttendanceLog" onClick={() => setOpen(false)} className="block py-2 text-slate-700 border-b border-slate-100 px-3 hover:text-amber-600 no-underline">• سجل الحضور العام</a></li>
                      <li><a href="/Tasks" onClick={() => setOpen(false)} className="block py-2 text-slate-700 border-b border-slate-100 px-3 hover:text-amber-600 no-underline">• لوحة الوظائف والمهام</a></li>
                    </>
                  )}
                </>
              )}
            </ul>

            {/* الأزرار الإجرائية السفلية في منيو الموبايل */}
            <div className="flex flex-col gap-3 mt-4">
              {/* 💡 التعديل الجوهري للموبايل: فصل الروابط والنصوص ديناميكياً للثلاث فئات بدون أخطاء JSX */}
              <a 
                href={
                  isLoggedIn && (role === "Admin" || role === "admin") ? "/MyDashboard" :
                  isLoggedIn && (role === "Staff" || role === "staff") ? "/Attendance" : 
                  "/Booking"
                } 
                onClick={() => setOpen(false)}
                className="w-full bg-[#D4AF37] text-white text-center py-3.5 rounded-xl font-black no-underline flex items-center justify-center gap-2 shadow-sm text-sm active:scale-95 transition-all"
              >
                {isLoggedIn && (role === "Admin" || role === "admin") ? (
                  "لوحة الإدارة والمتابعة"
                ) : isLoggedIn && (role === "Staff" || role === "staff") ? (
                  "تسجيل الحضور وإثبات البصمة"
                ) : (
                  <>احجز تذكرتك الآن <Ticket size={18} /></>
                )}
              </a>

              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-50 text-red-600 text-center py-3.5 rounded-xl font-bold flex gap-2 justify-center items-center border border-red-100 cursor-pointer outline-none shadow-sm"
                >
                  تسجيل الخروج <LogOut size={18} />
                </button>
              ) : (
                <a 
                  href="/loginPage" 
                  onClick={() => setOpen(false)}
                  className="w-full bg-slate-50 text-slate-700 text-center py-3.5 rounded-xl font-bold flex gap-2 justify-center items-center border no-underline text-sm shadow-sm"
                >
                  بوابة تسجيل الدخول <LogIn size={18} />
                </a>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
