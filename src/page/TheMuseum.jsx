import { FaPeopleGroup } from "react-icons/fa6";
import header from "../assets/images/img4.jpeg";
import main from "../assets/images/mainMuseum.png";
import { FaBookOpen  } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { ImPower } from "react-icons/im";
function TheMuseum() {
  return (
    <div className="pt-[105px] bg-[#F5F2ED]" dir="rtl">
      <div className="container mt-5  relative top-[50px]">
        <img
          className="object-cover w-full h-[500px] "
          src={header}
          alt=""
        />
        <div className="absolute inset-0 flex flex-col items-end justify-end bg-black/60 text-white pl-[120px] pb-[67px]">
          <h2 className="text-[48px] ">رحلة عبر الزمن</h2>
          <p className="text-[20px] text-[#F5F2ED]">
            تاريخ عريق يروي قصة حضارة مصرية
          </p>
        </div>
      </div>
      <h2 className="container text-[36px] text-[#1A1612] my-[70px]">
        عن المتحف المصري
      </h2>
      <div className=" flex flex-row justify-between container">
        <div
          className="text-[#000000] text-[25px] space-y-8 w-[762px] "
          style={{ wordSpacing: "0.5rem" }}
        >
          <p>
            المتحف المصري الكبير: حلم مصر الكبير يتحقق في عام 1992، بدأت أولى
            خطوات تحقيق حلم مصر الكبير بتخصيص مساحة تبلغ 117 فدانًا بالقرب من
            أهرامات الجيزة، لتكون موطنًا لأحد أكبر المتاحف في العالم: المتحف
            المصري الكبير.
          </p>
          <p>
            في عام 2002، وُضع حجر الأساس، معلنًا بداية رحلة طويلة حافلة
            بالتحديات والطموحات. وبعد عام واحد فقط، في 2003، فازت شركة هينيجان
            بنج المعمارية الإيرلندية بتصميم المتحف، بعد منافسة عالمية شارك فيها
            أكثر من 1500 تصميم من 82 دولة.
          </p>
          <p>
            اختيار الموقع: حلقة وصل بين الماضي والحاضر لم يكن اختيار الموقع
            عشوائيًا. صُمم المتحف ليكون رابطًا بصريًا وتاريخيًا بين الحضارة
            القديمة والعصر الحديث.
          </p>
          <p>
            تتماشى واجهته العملاقة المصنوعة من الرخام المرمر مع زوايا الأهرامات
            الثلاثة، وكأن المبنى ينبثق من قلب الهضبة ليعانق التاريخ.
          </p>
          <p>أبرز المعالم داخل المتحف</p>
          <p>
            البهو العظيم: يستقبل الزوار بتمثال الملك رمسيس الثاني الضخم، الذي
            يزن 83 طنًا ويبلغ طوله 11 مترًا. نُقل التمثال في رحلة تاريخية من
            ميدان رمسيس بالقاهرة ليستقر في مكانه الجديد
          </p>
          <p>
            المسلة المعلقة: أول مسلة من نوعها في العالم، تتيح للزائر رؤية خرطوش
            الملك رمسيس الثاني المحفور في أسفل قاعدتها بعد آلاف السنين من
            الخفاء.
          </p>
          <p>
            مجموعة توت عنخ آمون الكاملة: لأول مرة منذ اكتشاف المقبرة عام 1922،
            تُعرض أكثر من 5000 قطعة أثرية في مكان واحد، موزعة على قاعتين بمساحة
            إجمالية 7000 متر مربع.
          </p>
          <p>
            متحف مراكب الملك خوفو: نقلت إليه مركب الشمس الأولى ببراعة هندسية
            فائقة من موقعها الأصلي بجوار الهرم الأكبر.
          </p>
        </div>
        <div className="w-[515px] space-y-18">
          <img src={main} alt="" className="rounded-3xl" />
          <img src={header} alt="" className="rounded-3xl h-[292px]" />
          <div className="flex justify-between items-center text-center">
            <div className="bg-[#FFFFFF] text-center px-8 py-4 rounded-3xl">
              <h2 className="text-[#C9A961] text-[36px] ">+200</h2>
              <p className="text-[#4B5563] text-[14px] ">الف قطعة اثرية</p>
            </div>
            <div className="bg-[#FFFFFF] text-center px-8 py-4 rounded-3xl">
              <h2 className="text-[#C9A961] text-[36px]">2002</h2>
              <p className="text-[#4B5563] text-[14px]">سنة التأسيس</p>
            </div>
            <div className="bg-[#FFFFFF] text-center px-8 py-4 rounded-3xl">
              <h2 className="text-[#C9A961] text-[36px]">١م+</h2>
              <p className="text-[#4B5563] text-[14px]">زائر سنوياً</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-5 bg-[#FFFFFF] text-center py-9 px-6">
        <h2 className="text-[#C9A961] text-[34px] pb-15">قيمنا الأساسية</h2>
        <div className="container flex justify-between pb-5">
          <div className="w-fit text-center flex flex-col items-center space-y-3 ">
            <span className="text-[#C9A961] p-5 bg-[#c9aa6166] rounded-full ">
              <FaBookOpen size={30}/>
            </span>
            <h3 className="text-[#1A1612] text-[20px]">المعرفة</h3>
            <p className="text-[#4B5563] text-[14px]">
              نشر المعرفة والوعي بالتراث الثقافي
            </p>
          </div>
          <div className="w-fit text-center flex flex-col items-center space-y-3 ">
            <span className="text-[#C9A961] p-5 bg-[#c9aa6166] rounded-full">
              <GoVerified size={30}/>
            </span>
            <h3 className="text-[#1A1612] text-[20px]">الحفظ</h3>
            <p className="text-[#4B5563] text-[14px]">
             حماية التراث للأجيال القادمة
            </p>
          </div>
          <div className="w-fit text-center flex flex-col items-center space-y-3 ">
            <span className="text-[#C9A961] p-5 bg-[#c9aa6166] rounded-full ">
              <FaPeopleGroup size={30}/>
            </span>
            <h3 className="text-[#1A1612] text-[20px]">الشمولية</h3>
            <p className="text-[#4B5563] text-[14px]">
             إتاحة الثقافة للجميع دون استثناء
            </p>
          </div>
          <div className="w-fit text-center flex flex-col items-center space-y-3 ">
            <span className="text-[#C9A961] p-5 bg-[#c9aa6166] rounded-full ">
              <ImPower size={30}/>
            </span>
            <h3 className="text-[#1A1612] text-[20px]">الابتكار</h3>
            <p className="text-[#4B5563] text-[14px]">
             استخدام التقنيات الحديثة في العرض
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#1A1612] h-[352px] ">
        <div className="w-fit  text-center m-auto  py-[60px] space-y-11">
          <h2 className="text-[36px] text-[#FFFFFF]">اكتشف عالماً من التاريخ والثقافة</h2>
          <p className="text-[20px] text-[#F5F2ED]">خطط لزيارتك اليوم واستمتع برحلة لا تُنسى عبر العصور</p>
          <div className="space-x-11">
            <a href="/Ticket" className="hover:bg-amber-700 duration-150 text-[20px] text-[#F5F2ED] inline-block bg-[#C9A961] px-11 py-4">احجز زيارتك الآن</a>
            <a href="/Visit" className="  text-[20px] text-[#C9A961] border border-[#C9A961] px-10 py-3">تعرف على المواعيد </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheMuseum;
