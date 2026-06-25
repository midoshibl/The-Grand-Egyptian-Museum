import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

// 💡 حقن الـ Imports لـ 37 صورة حقيقية بداخل صفحة التفاصيل لتطابق المعرض بالملي
import img1 from "../assets/images/Archaeological8.png";
import img2 from "../assets/images/TheGreatFoyer.jpg";
import img3 from "../assets/images/mernaptah.png";
import img4 from "../assets/images2/تمثال الملك سنوسرت الاول.jpeg";
import img5 from "../assets/images2/تمثال ملكي لملكه بطلميه.jpeg";
import img6 from "../assets/images2/بوابه الملك امنمحات الاول.jpeg";
import img7 from "../assets/images2/تابوت جحوتي مس.jpeg";
import img8 from "../assets/images2/تابوت نيتوكريس.jpeg";
import img9 from "../assets/images2/تابوت حتحوري.jpeg";
import img10 from "../assets/images2/تمثال ابو الهول لرمسيس التاني.jpeg";
import img11 from "../assets/images2/ثلاثيه رمسيس وبتاح وسخمت.jpeg";
import img12 from "../assets/images2/تمثال الملك سنوسرت الاول الهيئه الاوربيه.jpeg";
import img13 from "../assets/images2/تمثال الملك امنحات الثالث.jpeg";
import img14 from "../assets/images2/تمثال الملك تحتمس الثالث.jpeg";
import img15 from "../assets/images2/تمثال الملك حتشبسوت.jpeg";
import img16 from "../assets/images2/تمثال الملك سيتي الثاني.jpeg";
import img17 from "../assets/images2/تمثال الملك مرنبتاح.jpeg";
import img18 from "../assets/images2/اقراط ملكيه لوح صقر.jpeg";
import img19 from "../assets/images2/قاعات كنوز توت عنخ امون.jpeg";
import img20 from "../assets/images2/اقراط ملكيه صقر براس بطه.jpeg";
import img21 from "../assets/images2/انوبيس رابض فوق صندوق طقسي.jpeg";
import img22 from "../assets/images2/اناء عطري علي هىئه اسد.jpeg";
import img23 from "../assets/images2/اناء لحفظ الزيوت العطريه.jpeg";
import img24 from "../assets/images2/الاكليل الملكي.jpeg";
import img25 from "../assets/images2/التابوت الخارجي المذهب.jpeg";
import img26 from "../assets/images2/تمثال ال كا الحارس.jpeg";
import img27 from "../assets/images2/تمثال الملك راقدا علي النعش.jpeg";
import img28 from "../assets/images2/راس بقره معبوده ميريت.jpeg";
import img29 from "../assets/images2/صندوق الاواني الكانوبيه.jpeg";
import img30 from "../assets/images2/صندوق طقسي محمول.jpeg";
import img31 from "../assets/images2/صندوق لحفظ الشعر.jpeg";
import img32 from "../assets/images2/صندوق مجوهرات من العاج.jpeg";
import img33 from "../assets/images2/قناع الدفن الذهبي.jpeg"; // تعديل المسار أوتوماتيك لو في فولدر مجاور
import img34 from "../assets/images2/كاس زهره اللوتس.jpeg";
import img35 from "../assets/images2/كرسي العرش الذهبي.jpeg";
import img36 from "../assets/images2/مروحه من ريش نعام.jpeg";
import img37 from "../assets/images2/مسند راس عاجي المعبود شو.jpeg";
import img38 from "../assets/images2/لوحه حور نخت.jpeg";
import img39 from "../assets/images2/مراكب الملك خوفو.jpeg";
import img40 from "../assets/images2/قناع الدفن الذهبي.jpeg";
import img41 from "../assets/images2/تمثال الصقر.png";
import img42 from "../assets/images2/مسلة الملك رمسيس الثاني.jpg";
import img43 from "../assets/images2/نموذج اوخ حتب.jpg";
import img44 from "../assets/images2/قمة مسلة للملكة حتشبسوت.jpeg";
import img45 from "../assets/images2/كرسي العرش الذهبي.jpeg";
import img46 from "../assets/images2/قناع مومياء لمسحتي.jpeg";
import img47 from "../assets/images2/مومياء لطفلة مغطاة بطبقة من الكارتوناج المذهب.jpeg";
import img48 from "../assets/images2/التابوت الخارجي لمسحتي.png";
import img49 from "../assets/images2/تمثال الكاتب متري.png";
import img50 from "../assets/images2/قلادة ذهبية (كنز دندرة).png";
import img51 from "../assets/images2/تمثال المعبود بتاح والملك رمسيس الثاني مع المعبودة سخمت.jpeg";
// 🏛️ الخارطة الرقمية المتطابقة 100% مع المعرض لربط تفاصيل الصور بالـ ID الفعلي
const artifactImagesMapping = {
  1: img1,
  5: img2,
  6: img3,
  7: img4,
  8: img5,
  9: img6,
  10: img7,
  11: img8,
  12: img9,
  13: img10,
  14: img11,
  15: img12,
  16: img13,
  17: img14,
  18: img15,
  19: img16,
  20: img17,
  21: img18,
  22: img19,
  23: img20,
  24: img21,
  25: img22,
  26: img23,
  27: img24,
  28: img25,
  29: img26,
  30: img27,
  31: img28,
  32: img29,
  33: img30,
  34: img31,
  35: img32,
  36: img33,
  37: img34,
  38: img35,
  39: img36,
  40: img37, 94: img38,
    128: img39,
    115: img40,
    116: img41,
    117: img42,
    118: img43,
    119: img44,
    120: img45,
    121: img46,
    122: img47,
    123: img48,
    124: img49,
    125: img50,
    126: img51,
};

const globalFallbackImage = img1; // استعمال أول صورة كحماية لو المعرف ملوش صورة مخصصة
const ArtifactDetails = () => {
  const { id } = useParams(); // استخراج الـ ID الحقيقي من الرابط
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات قطعة واحدة مع حماية الفحص الفوري للـ ID
    if (id && id !== "undefined" && id !== "string") {
      api.get(`/api/Artifact/${id}`)
        .then(res => {
          setItem(res.data?.data || res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching artifact details:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  // حماية في حال عدم وجود القطعة الأثرية في السيرفر لمنع انهيار الصفحة
  if (!item) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo text-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-md">
        <p className="text-red-500 font-bold text-lg mb-4">عذراً، لم يتم العثور على تفاصيل هذه القطعة الأثرية.</p>
        <a href="/Artifacts" className="text-amber-700 font-bold underline">العودة لمعرض القطع</a>
      </div>
    </div>
  );

  return (
    // ضبط الـ pt ليكون متوافقاً مع ارتفاع الناف بار على الموبايل واللابتوب
    <div className="min-h-screen bg-slate-50 pt-[130px] md:pt-[150px] pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* زر العودة الآمن باستخدام الروابط العادية */}
        <a href="/Artifacts" className="mb-6 text-amber-700 font-bold inline-flex items-center gap-2 hover:pr-2 transition-all no-underline">
          <span>→</span> العودة لمعرض القطع
        </a>

        {/* بطاقة التفاصيل المتجاوبة الأصلية الخاصة بك */}
        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          
          {/* قسم الصورة المرن: h-72 للموبايل لتوفير المساحة، وh-[500px] للابتوب */}
          <div className="w-full md:w-1/2 h-72 sm:h-96 md:h-[500px] bg-slate-100 shrink-0">
            <img 
              // 💡 التحديث الذهبي الصارم لربط صفحة التفاصيل وصهرها بالـ ID الفعلي المكبوس عليه خارجاً بالملي
              src={
                item.imageUrl && item.imageUrl !== "string" && !item.imageUrl.includes("string")
                  ? item.imageUrl 
                  : (artifactImagesMapping[item.artifactId || item.id || Number(id)] || globalFallbackImage)
              } 
              className="w-full h-full object-cover" 
              alt={item.name} 
              
              // 💡 حماية الـ onError الحاسمة: لو الرابط رمى 404، المتصفح بيجيب صورتك الحقيقية من الـ imports تلقائياً
              onError={(e) => {
                e.target.onerror = null; // منع التكرار اللانهائي
                const currentId = item.artifactId || item.id || Number(id);
                e.target.src = artifactImagesMapping[currentId] || globalFallbackImage;
              }}
            />
          </div>

          {/* قسم البيانات التفصيلية القادم من الـ API */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            
            {item.era && item.era !== "string" && (
              <span className="text-amber-600 font-black tracking-widest text-xs uppercase mb-2 block border-r-2 border-amber-600 pr-2">
                {item.era}
              </span>
            )}
            
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
              {item.name && item.name !== "string" ? item.name : "تحفة أثرية ملكية"}
            </h1>
            
            <div className="space-y-4 mb-6 md:mb-8">
              <p className="text-slate-500 text-sm md:text-base leading-relaxed italic">
                {item.description && item.description !== "string" ? item.description : "لا يوجد وصف تفصيلي متوفر لهذه القطعة في قاعدة البيانات حالياً."}
              </p>
              
              {/* شارات المادة والقسم متجاوبة */}
              <div className="flex flex-wrap gap-2 pt-2">
                {item.material && item.material !== "string" && (
                  <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-500">
                    المادة: {item.material}
                  </span>
                )}
                <span className="bg-amber-50 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-amber-700">
                  {typeof item.section === 'string' ? item.section : (item.section?.name || "قاعة العرض العام")}
                </span>
              </div>
            </div>

            {/* زر حجز جولة */}
            <a 
              href="/Booking" 
              className="w-full bg-slate-900 text-white text-center py-3.5 md:py-4 rounded-2xl font-black shadow-lg hover:bg-amber-600 hover:scale-[0.98] transition-all duration-200 no-underline text-xs md:text-sm block"
            >
              حجز جولة لمشاهدة القطعة 🎟️
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ArtifactDetails;
