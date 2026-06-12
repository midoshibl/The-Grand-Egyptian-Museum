import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const ArtifactDetails = () => {
  const { id } = useParams(); // استخراج الـ ID من الرابط
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات قطعة واحدة مع حماية الفحص الفوري للـ ID
    if (id && id !== "undefined" && id !== "string") {
      api.get(`/api/Artifact/${id}`)
        .then(res => {
          // الباك إند يرجع القطعة مباشرة أو داخل حقل data
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

        {/* 
            بطاقة التفاصيل المتجاوبة:
            flex-col: للموبايل (الصورة فوق والبيانات تحت)
            md:flex-row: للابتوب (الصورة والبيانات جنب بعض بالملي)
        */}
        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          
          {/* قسم الصورة المرن: h-72 للموبايل لتوفير المساحة، وh-[500px] للابتوب */}
          <div className="w-full md:w-1/2 h-72 sm:h-96 md:h-[500px] bg-slate-100 shrink-0">
            <img 
              src={item.imageUrl && item.imageUrl !== "string" ? item.imageUrl : 'https://placeholder.com'} 
              className="w-full h-full object-cover" 
              alt={item.name} 
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
