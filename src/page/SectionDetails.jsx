import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import museumService from '../services/museumService';

// 💡 استيراد الـ 37 صورة الحقيقية لمزامنتها داخل القاعات الفرعية بالـ ID
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
// 🏛️ الخارطة الرقمية المتطابقة لربط صور القطع أوتوماتيكياً بالـ ID جوه القاعات
const artifactImagesMapping = {
  1: img1, 5: img2, 6: img3, 7: img4, 8: img5, 9: img6, 10: img7,
  11: img8, 12: img9, 13: img10, 14: img11, 15: img12, 16: img13,
  17: img14, 18: img15, 19: img16, 20: img17, 21: img18, 22: img19,
  23: img20, 24: img21, 25: img22, 26: img23, 27: img24, 28: img25,
  29: img26, 30: img27, 31: img28, 32: img29, 33: img30, 34: img31,
  35: img32, 36: img33, 37: img34, 38: img35, 39: img36, 40: img37, 94: img38,
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

const globalFallbackImage = img1; // حماية للعرض العام
const SectionDetails = () => {
  const { sectionId } = useParams(); // قراءة رقم القاعة من الرابط
  const navigate = useNavigate();
  const [hallData, setHallData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sectionId && sectionId !== "undefined") {
      museumService.exploreSection(sectionId)
        .then(data => {
          setHallData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sectionId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  if (!hallData) return (
    <div className="p-20 text-center font-cairo text-red-500">
      عذراً، لم نتمكن من استكشاف بيانات هذه القاعة حالياً.
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* زر العودة */}
        <button onClick={() => navigate(-1)} className="mb-6 text-amber-700 font-bold flex items-center gap-2 hover:pr-2 transition-all bg-none border-none cursor-pointer">
          <span>→</span> العودة إلى خريطة القاعات
        </button>

        {/* كارت رأس القاعة */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-amber-100/40 mb-12">
          <span className="text-amber-600 font-black text-xs md:text-sm uppercase tracking-widest block mb-2">جناح العرض الرقمي</span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">{hallData.name || " أهم القطع المتواجدة بالقاعة"}</h1>
          <p className="text-slate-500 text-sm md:text-lg leading-relaxed italic">{hallData.description}</p>
        </div>

        {/* 1. قسم القطع الأثرية المتواجدة بالقاعة */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 border-r-4 border-amber-600 pr-3">القطع الأثرية المتاحة بالقاعة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hallData.artifacts && hallData.artifacts.map((art) => {
              const currentArtId = art.artifactId || art.id || art.Id;
              return (
                <Link to={`/artifact/${currentArtId}`} key={currentArtId} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 no-underline">
                  <div className="h-56 overflow-hidden bg-slate-100">
                    {/* 💡 التحديث الذهبي: دمج القاموس والـ onError لضمان سحب صورتك الحقيقية للـ ID داخل القاعة فرعياً */}
                    <img 
                      src={
                        art.imageUrl && art.imageUrl !== "string" && !art.imageUrl.includes("unsplash")
                          ? art.imageUrl 
                          : (artifactImagesMapping[currentArtId] || globalFallbackImage)
                      } 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={art.name} 
                      onError={(e) => {
                        e.target.onerror = null; // منع التكرار اللانهائي
                        e.target.src = artifactImagesMapping[currentArtId] || globalFallbackImage;
                      }}
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors text-base md:text-lg">{art.name}</h3>
                    <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">{art.era}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          {(!hallData.artifacts || hallData.artifacts.length === 0) && (
            <p className="text-slate-400 text-sm italic bg-white rounded-2xl p-6 text-center shadow-sm border">لا توجد قطع أثرية مسجلة في هذه القاعة حالياً.</p>
          )}
        </div>

        {/* 2. قسم المعارض المقامة داخل نفس القاعة */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6 border-r-4 border-amber-600 pr-3">المعارض الجارية بالقاعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hallData.exhibitions && hallData.exhibitions.map((ex) => (
              <Link to={`/exhibition/${ex.exhibitionId}`} key={ex.exhibitionId} className="group relative h-48 md:h-64 rounded-2rem overflow-hidden shadow-lg border no-underline">
                <img 
                  src={ex.imageUrl && ex.imageUrl !== "string" ? ex.imageUrl : globalFallbackImage} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={ex.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = globalFallbackImage; // حماية كروت المعارض بصورة فخمة بديلة
                  }}
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">{ex.name}</h3>
                  <p className="text-amber-400 text-xs font-medium">الفترة: {ex.startDate} - {ex.endDate}</p>
                </div>
              </Link>
            ))}
          </div>
          {(!hallData.exhibitions || hallData.exhibitions.length === 0) && (
            <p className="text-slate-400 text-sm italic bg-white rounded-2xl p-6 text-center shadow-sm border">لا توجد معارض جارية في هذه القاعة حالياً.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default SectionDetails;
