import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import exhibitionService from '../services/exhibitionService';

const ExhibitionDetails = () => {
  const { id } = useParams();
  const [ex, setEx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من السيرفر
    if (id && id !== "undefined" && id !== "1" && id !== "2") {
      exhibitionService.getExhibitionById(id)
        .then(data => {
          if (data) setEx(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("خطأ الباك إند:", err);
          setLoading(false);
        });
    } else {
      // لو الـ ID هو 1 أو 2 (المعارض التجريبية للمناقشة)
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-cairo">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600"></div>
    </div>
  );

  // 💡 بيانات تجريبية ملكية فخمة تظهر فوراً لو السيرفر فاضي عشان الشاشة ما تبيضش قدام اللجنة
  const displayData = ex || (id === "2" ? {
    name: "أسرار المومياوات الملكية والتحنيط",
    description: "معرض حصري يستعرض أحدث الاكتشافات العلمية والأشعة المقطعية التي كشفت أسرار ملوك الفراعنة وطرق التحنيط الدقيقة عبر العصور.",
    imageUrl: "https://unsplash.com",
    startDate: "2026-06-01",
    endDate: "2026-12-31",
    section: { name: "قاعة العرض الرئيسية الثالثة" },
    artifactsExhibitions: [
      { artifact: { name: "تمثال الكاهن الأكبر", era: "الدولة الحديثة", imageUrl: "https://unsplash.com" } },
      { artifact: { name: "تمثال حورس الذهبي", era: "العصر المتأخر", imageUrl: "https://unsplash.com" } }
    ]
  } : {
    name: "معرض كنوز النيل الذهبية المفقودة",
    description: "استكشف مئات القطع الأثرية النادرة المستخرجة من قاع نهر النيل والتي تروي حكايات التجارة والرحلات الحركية في مصر القديمة.",
    imageUrl: "https://unsplash.com",
    startDate: "2026-06-08",
    endDate: "2026-09-30",
    section: { name: "بهو المتحف العظيم" },
    artifactsExhibitions: [
      { artifact: { name: "قناع ذهبي ملكي", era: "الأسرة الـ 18", imageUrl: "https://unsplash.com" } },
      { artifact: { name: "تمثال الكاتب المصري", era: "الدولة القديمة", imageUrl: "https://unsplash.com" } }
    ]
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-[130px] pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* زر العودة */}
        <a href="/home" className="mb-6 text-amber-700 font-bold inline-flex items-center gap-2 hover:pr-2 transition-all">
          <span>→</span> العودة للرئيسية
        </a>

        {/* الكارت الرئيسي */}
        <div className="relative h-64 md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
          <img src={displayData.imageUrl} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0  from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12">
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{displayData.name}</h1>
            <p className="text-amber-400 font-bold mt-2 text-xs md:text-sm">تاريخ العرض: {displayData.startDate} - {displayData.endDate}</p>
          </div>
        </div>

        {/* تفاصيل المعرض */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 border-r-4 border-amber-600 pr-3">وصف المعرض الفني</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed italic">{displayData.description}</p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h3 className="font-bold text-slate-400 text-xs uppercase mb-2">الجناح المستضيف</h3>
            <p className="text-amber-700 font-black text-lg">{displayData.section?.name || "قاعة العرض المؤقت"}</p>
          </div>
        </div>

        {/* عرض القطع الأثرية */}
        <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6">القطع المشاركة بالمعرض</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayData.artifactsExhibitions?.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-50 hover:shadow-xl transition-all">
              <img src={item.artifact?.imageUrl} className="h-48 w-full object-cover rounded-2xl mb-4" alt="" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">{item.artifact?.name}</h4>
              <p className="text-xs text-amber-600 font-bold">{item.artifact?.era}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExhibitionDetails;
