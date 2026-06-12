import { FaPeopleGroup } from "react-icons/fa6";
import header from "../assets/images/img4.jpeg";
import main from "../assets/images/mainMuseum.png";
import { FaBookOpen } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { ImPower } from "react-icons/im";
function TheMuseum() {
  return (
    <div
      className="pt-[105px] bg-[#F5F2ED] min-h-screen font-cairo text-right"
      dir="rtl"
    >
      {/* قسم البانر والكرت الرئيسي - متجاوب بالكامل */}
      <div className="container mx-auto mt-6 px-4 relative">
        <div className="relative rounded-2rem overflow-hidden shadow-xl h-[300px] md:h-[500px]">
          <img
            className="object-cover w-full h-full object-top"
            src={header}
            alt="Grand Egyptian Museum Background"
          />
          {/* طبقة التظليل والنصوص: تتوسط في الموبايل وتتنحى في الشاشات الكبيرة */}
          <div className="absolute inset-0 flex flex-col items-center justify-center md:items-end md:justify-end bg-black/60 text-white p-6 md:pl-[120px] md:pb-[67px] text-center md:text-right">
            <h1 className="text-3xl md:text-5xl font-black mb-2 drop-shadow">
              رحلة عبر الزمن
            </h1>
            <p className="text-sm md:text-xl text-[#F5F2ED] font-medium drop-shadow-sm">
              تاريخ عريق يروي قصة حضارة مصرية
            </p>
          </div>
        </div>
      </div>
      {/* عنوان القسم الرئيسي */}
      <h2 className="container mx-auto text-2xl md:text-4xl font-black text-[#1A1612] my-8 md:my-12 px-4 border-r-4 border-amber-600 pr-3">
        عن المتحف المصري الكبير
      </h2>
      {/* حاوية النصوص التوضيحية المرنة - تفرش بالكامل على الموبايل والتابلت */}
      <div className="container mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8 justify-between">
        {/* صندوق السرد التاريخي: وسم w-full يضمن عدم خروج الكلمات نهائياً عن الشاشة */}
        <div
          className="text-slate-800 text-sm md:text-lg space-y-6 w-full lg:max-w-3xl leading-relaxed text-justify"
          style={{ wordSpacing: "0.1rem" }}
        >
          <p className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <strong className="text-amber-700 block text-base md:text-xl mb-1 font-black">
              المتحف المصري الكبير: حلم مصر الكبير يتحقق
            </strong>
            في عام 1992، بدأت أولى خطوات تحقيق حلم مصر الكبير بتخصيص مساحة تبلغ
            117 فدانًا بالقرب من أهرامات الجيزة، لتكون موطنًا لأحد أكبر المتاحف
            في العالم: المتحف المصري الكبير.
          </p>

          <p className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            في عام 2002، وُضع حجر الأساس، معلنًا بداية رحلة طويلة حافلة
            بالتحديات والطموحات. وبعد عام واحد فقط، في 2003، فازت شركة هينيجان
            بنج المعمارية الإيرلندية بتصميم المتحف، بعد منافسة عالمية شارك فيها
            أكثر من 1500 تصميم من 82 دولة.
          </p>

          <p className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <strong className="text-amber-700 block text-base md:text-xl mb-1 font-black">
              اختيار الموقع: حلقة وصل بين الماضي والحاضر
            </strong>
            لم يكن اختيار الموقع عشوائيًا. صُمم المتحف ليكون رابطًا بصريًا
            وتاريخيًا بين الحضارة القديمة والعصر الحديث. تتماشى واجهته العملاقة
            المصنوعة من الرخام المرمر مع زوايا الأهرامات الثلاثة، وكأن المبنى
            ينبثق من قلب الهضبة ليعانق التاريخ.
          </p>

          {/* معالم داخل المتحف مقسمة كبطاقات أنيقة سهلة التصفح بالموبايل */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl font-black text-slate-900 border-r-4 border-slate-900 pr-2 mb-4">
              أبرز المعالم الأثرية داخل المتحف
            </h3>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100">
              <h4 className="font-black text-amber-800 mb-1 text-base md:text-lg">
                🏛️ البهو العظيم:
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                يستقبل الزوار بتمثال الملك رمسيس الثاني الضخم، الذي يزن 83 طنًا
                ويبلغ طوله 11 مترًا. نُقل التمثال في رحلة تاريخية من ميدان رمسيس
                بالقاهرة ليستقر في مكانه الجديد.
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100">
              <h4 className="font-black text-amber-800 mb-1 text-base md:text-lg">
                🧭 المسلة المعلقة:
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                أول مسلة من نوعها في العالم، تتيح للزائر رؤية خرطوش الملك رمسيس
                الثاني المحفور في أسفل قاعدتها بعد آلاف السنين من الخفاء.
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100">
              <h4 className="font-black text-amber-800 mb-1 text-base md:text-lg">
                👑 مجموعة توت عنخ آمون الكاملة:
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                لأول مرة منذ اكتشاف المقبرة عام 1922، تُعرض أكثر من 5000 قطعة
                أثرية في مكان واحد، موزعة على قاعتين بمساحة إجمالية 7000 متر
                مربع.
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100">
              <h4 className="font-black text-amber-800 mb-1 text-base md:text-lg">
                ⛵ متحف مراكب الملك خوفو:
              </h4>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                نقلت إليه مركب الشمس الأولى ببراعة هندسية فائقة من موقعها الأصلي
                بجوار الهرم الأكبر لتستقر في صرح مخصص لها.
              </p>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: الصور والإحصاءات الرقمية للمتحف */}
        <div className="w-full lg:w-[450px] xl:w-[515px] space-y-6 md:space-y-8 shrink-0">
          <img
            src={main}
            alt="Museum Artifacts"
            className="rounded-3xl w-full h-auto object-cover shadow-sm"
          />
          <img
            src={header}
            alt="Museum Building"
            className="rounded-3xl w-full h-48 md:h-64 object-cover shadow-sm"
          />

          {/* شبكة الإحصاءات: 3 أعمدة في اللابتوب والتابلت، وعمود واحد في الموبايل */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <h4 className="text-[#C9A961] text-2xl md:text-3xl font-black">
                +200
              </h4>
              <p className="text-[#4B5563] text-xs font-bold mt-1">
                ألف قطعة أثرية
              </p>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <h4 className="text-[#C9A961] text-2xl md:text-3xl font-black">
                2002
              </h4>
              <p className="text-[#4B5563] text-xs font-bold mt-1">
                سنة التأسيس
              </p>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <h4 className="text-[#C9A961] text-2xl md:text-3xl font-black">
                ١م+
              </h4>
              <p className="text-[#4B5563] text-xs font-bold mt-1">
                زائر سنوياً
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* قفلة حاوية النصوص والصور المرنة التابعة للجزء الأول */}
      {/* قسم: قيمنا الأساسية الفرعونية */}
      <div className="mt-8 bg-[#FFFFFF] text-center py-12 px-4 md:px-6 border-t border-slate-100">
        <h2 className="text-[#C9A961] text-2xl md:text-4xl font-black mb-10">
          قيمنا الأساسية
        </h2>

        {/* شبكة القيم الأربعة متجاوبة: 2 في السطر للموبايل و4 جنب بعض للابتوب */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 justify-items-center">
          {/* قيمة المعرفة */}
          <div className="w-full max-w-[200px] text-center flex flex-col items-center space-y-3">
            <span className="text-[#C9A961] p-4 md:p-5 bg-[#c9aa6133] rounded-full shadow-inner flex items-center justify-center">
              <FaBookOpen size={26} />
            </span>
            <h3 className="text-[#1A1612] font-black text-base md:text-lg">
              المعرفة
            </h3>
            <p className="text-[#4B5563] text-xs leading-relaxed font-medium">
              نشر المعرفة والوعي بالتراث الثقافي
            </p>
          </div>

          {/* قيمة الحفظ */}
          <div className="w-full max-w-[200px] text-center flex flex-col items-center space-y-3">
            <span className="text-[#C9A961] p-4 md:p-5 bg-[#c9aa6133] rounded-full shadow-inner flex items-center justify-center">
              <GoVerified size={26} />
            </span>
            <h3 className="text-[#1A1612] font-black text-base md:text-lg">
              الحفظ
            </h3>
            <p className="text-[#4B5563] text-xs leading-relaxed font-medium">
              حماية التراث للأجيال القادمة
            </p>
          </div>

          {/* قيمة الشمولية */}
          <div className="w-full max-w-[200px] text-center flex flex-col items-center space-y-3">
            <span className="text-[#C9A961] p-4 md:p-5 bg-[#c9aa6133] rounded-full shadow-inner flex items-center justify-center">
              <FaPeopleGroup size={26} />
            </span>
            <h3 className="text-[#1A1612] font-black text-base md:text-lg">
              الشمولية
            </h3>
            <p className="text-[#4B5563] text-xs leading-relaxed font-medium">
              إتاحة الثقافة للجميع دون استثناء
            </p>
          </div>

          {/* قيمة الابتكار */}
          <div className="w-full max-w-[200px] text-center flex flex-col items-center space-y-3">
            <span className="text-[#C9A961] p-4 md:p-5 bg-[#c9aa6133] rounded-full shadow-inner flex items-center justify-center">
              <ImPower size={26} />
            </span>
            <h3 className="text-[#1A1612] font-black text-base md:text-lg">
              الابتكار
            </h3>
            <p className="text-[#4B5563] text-xs leading-relaxed font-medium">
              استخدام التقنيات الحديثة في العرض
            </p>
          </div>
        </div>
      </div>
      {/* قسم الدعوة للحجز والتنقل السفلي المتجاوب بالكامل */}
      <div className="bg-[#1A1612] py-12 md:py-16 text-white px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl md:text-4xl font-black leading-tight">
            اكتشف عالماً من التاريخ والثقافة
          </h2>
          <p className="text-sm md:text-xl text-[#F5F2ED] font-medium max-w-xl mx-auto">
            خطط لزيارتك اليوم واستمتع برحلة لا تُنسى عبر العصور
          </p>

          {/* تحويل الأزرار إلى عمودية في الموبايل وأفقية في اللابتوب */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/Ticket"
              className="w-full sm:w-auto font-black text-sm md:text-base text-center text-[#F5F2ED] bg-[#C9A961] hover:bg-amber-600 px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95"
            >
              احجز زيارتك الآن
            </a>
            <a
              href="/Visit"
              className="w-full sm:w-auto font-bold text-sm md:text-base text-center text-[#C9A961] border border-[#C9A961] px-8 py-3.5 rounded-xl hover:bg-white/5 transition-colors"
            >
              تعرف على المواعيد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheMuseum;
