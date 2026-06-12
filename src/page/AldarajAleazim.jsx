import React, { useEffect, useState } from 'react';
import artifactService from "../services/artifactService";

function AldarajAleazim() {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // رقم قاعة الدرج العظيم في الباك إند
  const SECTION_ID = 3; 

  useEffect(() => {
    artifactService.getAllArtifacts()
      .then(data => {
        // فلترة البيانات لتظهر قطع قاعة الدرج العظيم فقط
        const filtered = data.filter(item => item.sectionId === SECTION_ID);
        setArtifacts(Array.isArray(filtered) ? filtered : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading hall artifacts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-xl font-bold text-amber-800 animate-pulse">جاري فتح بوابات ممر الدرج العظيم...</p>
      </div>
    </div>
  );

  return (
    <main dir="rtl" className="font-cairo bg-slate-50 min-h-screen">
        {/* شريط التنقل العلوي (Breadcrumbs) - متجاوب بالملي */}
        <section className="pt-[105px]">
            <div className="p-3 bg-white text-xs md:text-[20px] font-medium text-[#4B5563] shadow w-full fixed top-[105px] z-40">
                <div className="container mx-auto flex gap-2 items-center px-4">
                    <a href="/home" className="hover:text-amber-600 transition">الرئيسية</a> 
                    <span className="text-gray-300">{`>`}</span>
                    <a href="/MuseumHalls" className="hover:text-amber-600 transition">القاعات</a> 
                    <span className="text-gray-300">{`>`}</span>
                    <span className="text-[#CD7F32] font-bold">الدرج العظيم</span>
                </div>
            </div>
        </section>

        {/* عنوان القاعة الفرعوني المطور */}
        <section className="container mx-auto mt-32 px-4 text-center">
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">صرح الدرج العظيم الملكي</h1>
            <div className="w-20 h-1.5 bg-amber-600 mx-auto rounded-full"></div>
        </section>

        {/* شبكة الصور والأسماء - متجاوبة 100% */}
        <section className="container mx-auto my-12 px-4">
            {/* 
                تحديث التجاوب:
                grid-cols-1: للموبايل (كارت عريض ومريح للعين)
                sm:grid-cols-2: للتابلت (كارتين بالسطر)
                lg:grid-cols-3: للابتوب والشاشات الكبيرة (3 كروت متناسقة)
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {artifacts.map((item) => (
                    <a href={`/Artifact/${item.artifactId}`} key={item.artifactId} className="group no-underline">
                        <div className="text-center bg-white p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-500 border border-gray-100 flex flex-col justify-between h-full">
                            
                            {/* حاوية الصورة المرنة والذكية */}
                            <div className="overflow-hidden rounded-2xl h-56 md:h-72 mb-4 bg-slate-50">
                                <img 
                                  src={item.imageUrl && item.imageUrl !== "string" ? item.imageUrl : 'https://placeholder.com'} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            </div>
                            
                            {/* اسم القطعة الأثرية المحدث */}
                            <div className="pb-2">
                              <h2 className="text-[#4B5563] text-lg md:text-2xl font-bold group-hover:text-[#CD7F32] transition-colors leading-tight line-clamp-2">
                                  {item.name !== "string" ? item.name : "تمثال ملكي ضخم"}
                              </h2>
                              <p className="text-amber-600 text-[11px] md:text-xs mt-2 font-bold uppercase tracking-wider">
                                {item.era !== "string" ? item.era : "المملكة القديمة"}
                              </p>
                            </div>

                        </div>
                    </a>
                ))}
            </div>

            {/* حالة إذا كانت قاعة الدرج العظيم فارغة في قاعدة البيانات */}
            {artifacts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200 max-w-4xl mx-auto">
                    <span className="text-5xl block mb-4">🏛️</span>
                    <p className="text-gray-400 font-bold italic text-base md:text-lg">لا توجد تماثيل أو قطع معروضة على الدرج العظيم حالياً.</p>
                </div>
            )}
        </section>
    </main>
  );
}

export default AldarajAleazim;
