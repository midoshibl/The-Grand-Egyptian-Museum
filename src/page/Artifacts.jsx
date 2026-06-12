import React, { useEffect, useState } from 'react';
// الاستدعاء الصحيح بدون أقواس {} ليتوافق مع الـ export default
import artifactService from '../services/artifactService'; 

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء الدالة الصحيحة من ملف السيرفس المربوط بالباك إند
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
      {/* عنوان متجاوب يصغر تلقائياً في شاشات الجوال */}
      <h1 className="text-2xl md:text-5xl font-black text-center mb-10 md:mb-12 text-slate-900 tracking-tight">معرض القطع الأثرية</h1>
      
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
                src={item.imageUrl && item.imageUrl !== "string" ? item.imageUrl : 'https://unsplash.com'} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                {item.material !== "string" ? item.material : "مادة فرعونية نادرة"}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* حالة خلو جدول قاعدة البيانات من مقتنيات */}
      {artifacts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-4xl mx-auto">
           <span className="text-5xl block mb-4">🏺</span>
           <p className="text-slate-400 font-bold italic text-sm md:text-base">لا توجد قطع أثرية مسجلة في قاعدة البيانات حالياً.</p>
        </div>
      )}
    </div>
  );
};

export default Artifacts;