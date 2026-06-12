// import MuseumSlider from "../components/Home/MuseumSlider";
import Sliderimg from "../components/Home/Sliderimg";
import SomeHalls from "../components/Home/SomeHalls";
import { Clock8, MapPin, Ticket } from 'lucide-react';

function Home() {
  return (
    <>
      {/* القسم الرئيسي (Hero Section) */}
      <div className="relative w-full min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* خلفية الصور السلايدر */}
        <div className="absolute inset-0 w-full h-full z-10">
          <Sliderimg />
        </div>
        
        {/* طبقة تظليل سوداء ناعمة فوق السلايدر لضمان وضوح الكلمات البيضاء على كافة الشاشات */}
        <div className="absolute inset-0  z-20"></div>

        {/* محتوى الكلمات الترحيبية - متجاوب بالكامل */}
        <div className="relative z-30 w-full max-w-4xl mx-auto px-4 text-center font-cairo text-[#FFFFFF] pt-20 md:pt-0">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 leading-tight drop-shadow-lg">
            المتحف المصري الكبير
          </h1>
          <p className="my-6 md:my-8 text-sm md:text-lg lg:text-xl font-medium text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            اكتشف كنوز الحضارة المصرية القديمة في أكبر متحف أثري في العالم
          </p>
          
          {/* الأزرار متجاوبة: تحت بعض في الموبايل، جنب بعض في اللابتوب */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="/MuseumHalls" className="w-full sm:w-auto text-center border-2 border-[#FFFFFF] py-3.5 px-8 rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-300">
              استكشف القاعات
            </a>
            <a href="/Ticket" className="w-full sm:w-auto text-center bg-[#D4AF37] text-white py-4 px-8 rounded-2xl font-black shadow-lg hover:bg-amber-500 hover:scale-95 transition-all duration-300">
              احجز تذكرتك الآن
            </a>
          </div>
        </div>
      </div>

      {/* قسم: رحلة عبر التاريخ */}
      <div className="bg-[#F5F1E8] py-12 md:py-20 text-center px-4 md:px-8 font-cairo">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[#1F2937] font-black text-2xl md:text-4xl">
            رحلة عبر التاريخ
          </h2>
          <p className="text-[#6B7280] pt-6 md:pt-8 text-sm md:text-base leading-relaxed italic">
            يضم المتحف المصري الكبير أكثر من 100,000 قطعة أثرية تحكي قصة الحضارة
            المصرية العريقة، من عصر ما قبل التاريخ وحتى العصر اليوناني الروماني.
            اكتشف كنوز توت عنخ آمون، والمومياوات الملكية، والتماثيل الضخمة التي
            تجسد عظمة الفراعنة.
          </p>
        </div>
      </div>

      {/* قسم: القاعات المميزة */}
      <div className="py-12 md:py-20 text-center px-4 md:px-8 font-cairo bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#1F2937] font-black text-2xl md:text-4xl">
            القاعات المميزة
          </h2>
          <p className="text-[#6B7280] pt-2 text-sm md:text-base mb-10">استكشف أهم القاعات في المتحف</p>
          
          {/* حاوية مرنة تستوعب القاعات دون تمدد مشوه */}
          <div className="w-full">
            <SomeHalls />
          </div>
        </div>
      </div>

      {/* قسم الإحصاءات الرقمية الفرعونية */}
      <div className="bg-[#1F2937] w-full text-center py-12 md:py-16 px-4 font-cairo">
        {/* تحويل القائمة لترتيب عمودي في الموبايل وعرضي في الشاشات الأكبر */}
        <ul className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center" dir="rtl">
          <li className="space-y-1">
            <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-black tracking-tight">100,000+</h2>
            <p className="text-[#ffff] text-xs md:text-sm font-medium">قطعة أثرية</p>
          </li>
          <li className="space-y-1">
            <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-black tracking-tight">5,000</h2>
            <p className="text-[#ffff] text-xs md:text-sm font-medium">سنة من التاريخ</p>
          </li>
          <li className="space-y-1">
            <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-black tracking-tight">15</h2>
            <p className="text-[#ffff] text-xs md:text-sm font-medium">قاعة عرض</p>
          </li>
          <li className="space-y-1">
            <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-black tracking-tight">2M+</h2>
            <p className="text-[#ffff] text-xs md:text-sm font-medium">زائر سنوياً</p>
          </li>
        </ul>
      </div>

      {/* قسم: معلومات الزيارة والمواعيد */}
      <div className="w-full py-12 md:py-20 px-4 md:px-8 bg-white font-cairo">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[#1F2937] font-black text-2xl md:text-4xl">معلومات الزيارة</h2>
          
          <div className="mt-10 md:mt-12">
            {/* تحويل المعلومات إلى عمود للموبايل وجنب بعض للابتوب من خلال grid-cols-1 md:grid-cols-3 */}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 justify-items-center" dir="rtl">
              
              {/* بطاقة أوقات العمل */}
              <li className="flex flex-col justify-center items-center w-full max-w-[280px] bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="rounded-full w-12 h-12 text-[#ffff] flex items-center justify-center bg-[#D4AF37] shadow-md shadow-amber-100">
                  <Clock8 size={22} />
                </div>
                <h3 className="text-[#1F2937] font-black text-lg pt-4 pb-2">أوقات العمل</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">يومياً من 9:00 صباحاً حتى 6:00 مساءً</p>
              </li>

              {/* بطاقة الموقع */}
              <li className="flex flex-col justify-center items-center w-full max-w-[280px] bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="rounded-full w-12 h-12 text-[#ffff] flex items-center justify-center bg-[#D4AF37] shadow-md shadow-amber-100">
                  <MapPin size={22} />
                </div>
                <h3 className="text-[#1F2937] font-black text-lg pt-4 pb-2">الموقع</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">ميدان الرماية، محافظة الجيزة، مصر</p>
              </li>

              {/* بطاقة أسعار التذاكر */}
              <li className="flex flex-col justify-center items-center w-full max-w-[280px] bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="rounded-full w-12 h-12 text-[#ffff] flex items-center justify-center bg-[#D4AF37] shadow-md shadow-amber-100">
                  <Ticket size={22} />
                </div>
                <h3 className="text-[#1F2937] font-black text-lg pt-4 pb-2">أسعار التذاكر</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">تبدأ من 200 جنيه للمصريين</p>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
