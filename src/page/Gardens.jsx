import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gardenService from '../services/gardenService';

const Gardens = () => {
  const [gardens, setGardens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gardenService.getAllGardens().then(data => {
      setGardens(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold font-cairo">جاري فتح الحدائق الخارجية...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-black text-center mb-16 text-slate-900">حدائق ومساحات المتحف</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardens.map((garden) => (
            <div key={garden.gardenId} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col group">
              <div className="relative h-64 overflow-hidden">
                <img src={garden.imageUrl && garden.imageUrl !== "string" ? garden.imageUrl : 'https://unsplash.com'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                <div className="absolute top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg">
                  {garden.section?.name && garden.section.name !== "string" ? garden.section.name : "مساحة لاندسكيب مفتوحة"}
                </div>
              </div>

              <div className="p-6 md:p-8 grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">{garden.name !== "string" ? garden.name : "الحديقة الملكية"}</h2>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">{garden.description !== "string" ? garden.description : "وصف طبيعي تفصيلي للمنطقة الخضراء."}</p>
                </div>

                {/* ربط عميق متداخل: الحديقة تفتح تفاصيل القسم وتفاصيل المعارض المتواجدة حولها */}
                {garden.section && (
                  <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl space-y-3">
                    <p className="text-xs font-bold text-slate-700">🏛️ قاعات العرض المجاورة لهذه الحديقة:</p>
                    <p className="text-xs font-black text-emerald-700">{garden.section.name}</p>
                    
                    {/* الدخول للمعارض من داخل كارت الحديقة */}
                    {garden.section.exhibitions && garden.section.exhibitions.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">🖼️ فعاليات المعارض المجاورة:</p>
                        <div className="flex flex-wrap gap-1">
                          {garden.section.exhibitions.map((ex, i) => (
                            <Link to={`/exhibition/${ex.exhibitionId || i}`} key={i} className="bg-white text-[10px] px-2 py-0.5 rounded border text-slate-600 hover:text-emerald-600">
                              {ex.name || "معرض مؤقت"}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gardens;
