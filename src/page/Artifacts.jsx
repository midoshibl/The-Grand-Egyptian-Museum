import React, { useEffect, useState } from 'react';
// الاستدعاء الصحيح بدون أقواس {} ليتوافق مع الـ export default
import artifactService from '../services/artifactService'; 

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء الدالة الصحيحة من ملف السيرفس بتاعك
    artifactService.getAllArtifacts()
      .then(data => {
        setArtifacts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading artifacts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-xl font-bold text-amber-800 animate-pulse">جاري استحضار عظمة التاريخ...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-cairo pt-28 md:pt-32" dir="rtl">
      <h1 className="text-3xl md:text-5xl font-black text-center mb-12 text-slate-900 tracking-tight">معرض القطع الأثرية</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {artifacts.map((item) => (
          <a 
            href={`/Artifact/${item.artifactId}`} 
            key={item.artifactId}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 border border-slate-100 flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img 
                src={item.imageUrl && item.imageUrl !== "string" ? item.imageUrl : 'https://placeholder.com'} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              
              {item.era && item.era !== "string" && (
                <div className="absolute top-4 right-4 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-xl shadow">
                  {item.era}
                </div>
              )}
            </div>

            <div className="p-5 text-center bg-white">
              <h3 className="text-base md:text-lg font-black text-slate-800 group-hover:text-amber-700 transition-colors leading-tight line-clamp-2">
                {item.name !== "string" ? item.name : "تحفة أثرية ملكية"}
              </h3>
              <p className="text-slate-400 text-[11px] mt-1 font-medium italic">{item.material !== "string" ? item.material : "مادة فرعونية نادرة"}</p>
            </div>
          </a>
        ))}
      </div>

      {artifacts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
           <span className="text-5xl block mb-4">🏺</span>
           <p className="text-slate-400 font-bold italic">لا توجد قطع أثرية مسجلة في قاعدة البيانات حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default Artifacts;
