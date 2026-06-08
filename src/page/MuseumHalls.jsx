import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import museumService from '../services/museumService';

const MuseumHalls = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    museumService.listSections().then(data => {
      setSections(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] font-cairo">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
        <p className="text-xl font-bold text-amber-800 animate-pulse">جاري فتح أجنحة المتحف الكبير...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-24 md:pt-32 pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* رأس الصفحة المتجاوب */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-600 font-bold tracking-widest mb-2 uppercase text-xs md:text-sm">أروقة وقاعات العرض</p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">خريطة قاعات المتحف</h1>
          <div className="w-20 h-1.5 bg-amber-600 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            تنقل بين قاعات العرض المجهزة بأحدث تقنيات العرض المتحفي لتعيش تجربة استثنائية وسط الحضارة الفرعونية.
          </p>
        </div>

        {/* شبكة القاعات - متجاوبة تماماً */}
        {/* 
            grid-cols-1: للموبايل (كارت كامل في السطر)
            md:grid-cols-2: للتابلت (كارتين في السطر)
            lg:grid-cols-3: للابتوب والشاشات الكبيرة (3 كروت في السطر)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sections.map((hall) => (
            <div 
              key={hall.sectionId} 
              className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-100/40 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* لمسة ديكور خلفية للكارت تعطي طابع فرعوني */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100/50 transition-colors"></div>

              <div>
                {/* رقم القاعة الأنيق */}
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 font-black text-lg mb-6 border border-amber-100">
                  {hall.sectionId}
                </div>

                {/* اسم القاعة الحقيقي من الباك */}
                <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                  {hall.name}
                </h2>

                {/* وصف القاعة الحقيقي من الباك */}
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 italic">
                  {hall.description}
                </p>
              </div>

              {/* زر الدخول لاستكشاف محتويات القاعة بالتوجيه السليم لقاعدة البيانات */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-bold text-slate-400">المتحف المصري الكبير</span>
                {/* 
                    هنا نربط التوجيه ليذهب لصفحة القاعة بناءً على الـ sectionId الخاص بها
                    مثل: /section/4 ليفتح قاعة توت عنخ آمون
                */}
                <Link 
                  to={`/section/${hall.sectionId}`} 
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm hover:bg-amber-600 transition-all shadow-md group-hover:-translate-y-1 transform duration-300"
                >
                  استكشف القاعة ←
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MuseumHalls;
