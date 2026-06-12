import logo_nav from "../../assets/images/logo1.png";
import { Phone, MapPin, X } from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram} from "react-icons/fa";

function Footer() {
  return (
    // الحاوية الخارجية للملف بالكامل
    <footer
      className="w-full font-medium font-cairo bg-[#1F2937] select-none text-right pt-12 pb-6 px-4 md:px-8 mt-auto"
      dir="rtl"
    >
      {/* 
          تحديث التجاوب السحري: تحويل الأقسام الأربعة إلى شبكة مرنة
          grid-cols-1: للموبايل (تحت بعض بشكل مريح)
          sm:grid-cols-2: للتابلت (قسمين جنب بعض في كل سطر)
          lg:grid-cols-4: للابتوب (الـ 4 أقسام جنب بعض بالملي)
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 text-center sm:text-right">
        
        {/* القسم الأول: شعار واسم المتحف */}
        <div className="flex flex-col items-center sm:items-start justify-center space-y-2">
          {/* <img src={logo_nav} alt="logo" className="w-[180px] mb-2" /> */}
          <h2 className="text-lg md:text-xl font-black text-[#FFFFFF]">المتحف المصري الكبير</h2>
          <p className="text-xs text-[#D1D5DB] leading-relaxed max-w-xs">
            أكبر متحف أثري في العالم يضم كنوز الحضارة المصرية القديمة ويحفظ تراثها الخالد.
          </p>
        </div>

        {/* القسم الثاني: روابط سريعة بالتوجيه المعتمد للـ Routes */}
        <div className="space-y-3">
          <h3 className="text-[#FFFFFF] text-base font-black border-r-4 border-[#D4AF37] pr-2">روابط سريعة</h3>
          <ul className="text-[#D1D5DB] space-y-2 text-sm">
            <li className="hover:text-[#D4AF37] transition-colors"><a href="/home" className="no-underline text-inherit">الرئيسية</a></li>
            <li className="hover:text-[#D4AF37] transition-colors"><a href="/MuseumHalls" className="no-underline text-inherit">القاعات</a></li>
            <li className="hover:text-[#D4AF37] transition-colors"><a href="/ExhibitionDetails" className="no-underline text-inherit">المعارض المؤقتة</a></li>
            <li className="hover:text-[#D4AF37] transition-colors"><a href="/Booking" className="no-underline text-inherit">حجز التذكرة</a></li>
            <li className="hover:text-[#D4AF37] transition-colors"><a href="/TheMuseum" className="no-underline text-inherit">عن المتحف</a></li>
          </ul>
        </div>

        {/* القسم الثالث: معلومات التواصل الجغرافية والهاتفية */}
        <div className="space-y-3">
          <h3 className="text-[#FFFFFF] text-base font-black border-r-4 border-[#D4AF37] pr-2">معلومات التواصل</h3>
          <ul className="text-[#D1D5DB] space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone size={18} className="text-[#D4AF37] shrink-0" />
              <span dir="ltr" className="font-mono">+20 0233 7634 86</span>
            </li>
            <li className="flex items-start justify-center sm:justify-start gap-2">
              <MapPin size={22} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed max-w-60">
                طريق القاهرة - الإسكندرية الصحراوي، كفر نصار، الهرم، محافظة الجيزة 3513204، مصر.
              </p>
            </li>
          </ul>
        </div>

        {/* القسم الرابع: منصات التواصل الاجتماعي (السوشيال ميديا) */}
        <div className="space-y-3 flex flex-col items-center sm:items-start">
          <h3 className="text-[#FFFFFF] text-base font-black border-r-4 border-[#D4AF37] pr-2 w-full text-center sm:text-right">تابعنا</h3>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-3 pt-1">
            <li className="bg-[#D4AF37] rounded-full p-2.5 hover:scale-110 hover:bg-amber-500 transition-all shadow-md">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center justify-center"><FaFacebook size={22} color="#1877F2" /></a>
            </li>
            <li className="bg-[#D4AF37] rounded-full p-2.5 hover:scale-110 hover:bg-amber-500 transition-all shadow-md">
             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center justify-center"><FaInstagram size={22} className="text-purple-700" /></a>
            </li>
            <li className="bg-[#D4AF37] rounded-full p-2.5 hover:scale-110 hover:bg-amber-500 transition-all shadow-md">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center justify-center"><X size={20} className="text-black font-bold" /></a>
            </li>
            <li className="bg-[#D4AF37] rounded-full p-2.5 hover:scale-110 hover:bg-amber-500 transition-all shadow-md">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center justify-center"><FaYoutube size={22} color="#FF0000" /></a>
            </li>
          </ul>
        </div>

      </div>

      {/* خط الفصل السفلي المطور */}
      <hr className="max-w-7xl mx-auto border-t border-slate-700 my-4 opacity-40"/>
      
      {/* حقوق النشر */}
      <div className="max-w-7xl mx-auto text-center text-xs text-[#D1D5DB]/80 tracking-wide pt-2">
        © ٢٠٢٦ المتحف المصري الكبير. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

export default Footer;
