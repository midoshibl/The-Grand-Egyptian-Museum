import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import museumService from '../services/museumService';

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
        <button onClick={() => navigate(-1)} className="mb-6 text-amber-700 font-bold flex items-center gap-2 hover:pr-2 transition-all">
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
            {hallData.artifacts && hallData.artifacts.map((art) => (
              <Link to={`/artifact/${art.artifactId}`} key={art.artifactId} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="h-56 overflow-hidden bg-slate-100">
                  <img src={art.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={art.name} />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors text-base md:text-lg">{art.name}</h3>
                  <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">{art.era}</p>
                </div>
              </Link>
            ))}
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
              <Link to={`/exhibition/${ex.exhibitionId}`} key={ex.exhibitionId} className="group relative h-48 md:h-64 rounded-2rem overflow-hidden shadow-lg border">
                <img src={ex.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
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
