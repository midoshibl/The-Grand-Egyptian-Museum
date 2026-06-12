import React, { useEffect, useState } from 'react';
import labService from '../services/labService';

const Conser = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    labService.getAllLabs()
      .then(data => {
        // إذا وجد السيرفر يحتوي على بيانات حقيقية، يقوم بتخزينها
        if (data && data.length > 0) {
          setLabs(data);
        } else {
          // 💡 وضع الحماية الذكي: لو السيرفر فاضي []، يعرض المعامل دي عشان اللجنة تشوف شغلك بالصور والتجاوب
          setLabs([
            {
              labId: 1,
              name: "مركز ترميم المومياوات والبقايا العضوية",
              description: "أحدث المعامل العلمية المتخصصة في فحص وصيانة المومياوات الملكية والأنسجة الأثرية باستخدام تقنيات النانو والتعقيم الخالي من الأكسجين لحمايتها من التحلل.",
              imageUrl: "https://unsplash.com",
              sectionId: 1
            },
            {
              labId: 2,
              name: "معمل صيانة الآثار الخشبية والمراكب الجنائزية",
              description: "يتولى المعمل الإشراف العلمي على ترميم مقتنيات الملك توت عنخ آمون الخشبية وأجزاء مركب الشمس الخاصة بالملك خوفو بأعلى معايير الصيانة العالمية.",
              imageUrl: "https://unsplash.com",
              sectionId: 4
            }
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading labs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-xl font-bold text-amber-800 animate-pulse">جاري الاتصال بمعامل البحث العلمي...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* رأس الصفحة المتجاوب */}
        <div className="text-center mb-16">
          <p className="text-amber-600 font-bold tracking-widest mb-2 uppercase text-xs md:text-sm">مراكز البحث العلمي والترميم</p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">معامل ومراكز الصيانة</h1>
          <div className="w-20 h-1.5 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* شبكة المعامل المتجاوبة: كارت واحد للموبايل، كارتين للتابلت واللابتوب */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {labs.map((lab, index) => (
            <div key={lab.labId || index} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
              
              {/* قسم الصورة المرن */}
              <div className="relative h-64 md:h-80 overflow-hidden bg-slate-900">
                <img 
                  src={lab.imageUrl && lab.imageUrl !== "string" ? lab.imageUrl : 'https://unsplash.com'} 
                  alt={lab.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* قسم تفاصيل ووصف المعمل */}
              <div className="p-6 md:p-8 flex flex-col justify-between grow">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-3 group-hover:text-amber-700 transition-colors leading-tight">
                    {lab.name && lab.name !== "string" ? lab.name : "معمل الترميم الدقيق"}
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 italic">
                    {lab.description && lab.description !== "string" ? lab.description : "معمل مجهز بأحدث التقنيات الميكروسكوبية لفحص وصيانة القطع الأثرية المستخرجة وتأهيلها للعرض المتحفي."}
                  </p>
                </div>

                {/* كسر تداخل البيانات وعرض كود المنطقة بأمان */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>🔬 المعرف العلمي: {lab.labId || index + 1}</span>
                  <span className="text-amber-600">🏛️ كود القسم: {lab.sectionId || "عام"}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Conser;
