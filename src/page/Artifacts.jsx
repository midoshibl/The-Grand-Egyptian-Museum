import React, { useEffect, useState } from "react";
// الاستدعاء الصحيح بدون أقواس {} ليتوافق مع الـ export default
import artifactService from "../services/artifactService";
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
import img33 from "../assets/images2/قناع الدفن الذهبي.jpeg";
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
// import img3 from "../assets/images/mernaptah.png";
// import img5 from "../assets/images/artifact5.jpg";

// 🏛️ ملف الخرائط الرقمية لصور القطع الأثرية بناءً على الـ ID الحقيقي للباك إند
const artifactImagesMapping = {
  1: img1, //
  5: img2, // ية
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
  40: img37,
  94: img38,
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
  // 💡 يمكنك إضافة أي ID قطعة (مثال: 28, 29, 32) وصورتها المفضلة هنا بالملي!
};

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء الدالة الصحيحة من ملف السيرفس المربوط بالباك إند
    artifactService
      .getAllArtifacts()
      .then((data) => {
        setArtifacts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading artifacts:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-amber-800 animate-pulse">
            جاري استحضار عظمة التاريخ...
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="p-4 md:p-8 bg-slate-50 min-h-screen font-cairo pt-28 md:pt-32"
      dir="rtl"
    >
      {/* عنوان متجاوب يصغر تلقائياً في شاشات الجوال */}
      <h1 className="text-2xl md:text-5xl font-black text-center mb-10 md:mb-12 text-slate-900 tracking-tight">
        معرض القطع الأثرية
      </h1>

      {/* 
          تحديث التجاوب السحري للأعمدة:
          grid-cols-1: للموبايل (كارت عريض واضح)
          sm:grid-cols-2: للتابلت الصغير (كارتين في السطر)
          md:grid-cols-3: للتابلت الكبير والشاشات المتوسطة (3 كروت في السطر)
          lg:grid-cols-4: للابتوب والشاشات الكبيرة (4 كروت متناسقة بالملي)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {artifacts.map((item) => (
          <a
            href={`/Artifact/${item.artifactId}`}
            key={item.artifactId}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 border border-slate-100 flex flex-col justify-between h-full no-underline"
          >
            {/* حاوية الصورة المرنة */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img
                // 💡 التحديث الذهبي: لو رابط الباك إند مكسور أو رمى "string"، الكود بيعرض فوراً صورتك الحقيقية المربوطة بالـ ID من القاموس
                src={
                  item.imageUrl &&
                  item.imageUrl !== "string" &&
                  !item.imageUrl.includes("unsplash")
                    ? item.imageUrl
                    : artifactImagesMapping[
                        item.artifactId || item.id || item.Id
                      ] || globalFallbackImage
                }
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                // 💡 حماية الـ onError الحاسمة: لو الرابط اللي جاي من الـ API مكسور أو رمى 404 أونلاين،
                // المتصفح هيلقطه فوراً ويجيب صورتك الحقيقية المخزنة بالـ ID من القاموس فوق!
                onError={(e) => {
                  e.target.onerror = null; // حماية صارمة لمنع التكرار اللانهائي
                  const currentId = item.artifactId || item.id || item.Id;
                  e.target.src =
                    artifactImagesMapping[currentId] || globalFallbackImage;
                }}
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>

              {/* شارة العصر التاريخي فوق الصورة */}
              {item.era && item.era !== "string" && (
                <div className="absolute top-4 right-4 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-xl shadow">
                  {item.era}
                </div>
              )}
            </div>

            {/* نصوص وتفاصيل القطعة */}
            <div className="p-5 text-center bg-white grow flex flex-col justify-center">
              <h3 className="text-base md:text-lg font-black text-slate-800 group-hover:text-amber-700 transition-colors leading-tight line-clamp-2 mb-1">
                {item.name !== "string" ? item.name : "تحفة أثرية ملكية"}
              </h3>
              <p className="text-slate-400 text-[11px] font-medium italic">
                {item.material !== "string"
                  ? item.material
                  : "مادة فرعونية نادرة"}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* حالة خلو جدول قاعدة البيانات من مقتنيات */}
      {artifacts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
          <span className="text-5xl block mb-4">🏺</span>
          <p className="text-slate-400 font-bold italic text-sm md:text-base">
            لا توجد قطع أثرية مسجلة في قاعدة البيانات حالياً.
          </p>
        </div>
      )}
    </div>
  );
};

export default Artifacts;
