import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import labService from '../services/labService';

const ConservationLabs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    labService.getAllLabs().then(data => {
      setLabs(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold font-cairo">جاري فتح المعامل العلمية...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-[150px] pb-16 px-4 md:px-8 font-cairo text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-center mb-16 text-teal-900">مراكز الترميم والصيانة</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {labs.map((lab) => (
            <div key={lab.labId} className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all">
              <div>
                <img src={lab.imageUrl && lab.imageUrl !== "string" ? lab.imageUrl : 'https://placeholder.com'} className="w-full h-64 object-cover rounded-3xl mb-6" alt="" />
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{lab.name !== "string" ? lab.name : "معمل الترميم الملكي"}</h2>
                <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">{lab.description !== "string" ? lab.description : "وصف المعمل التفصيلي."}</p>
                
                {/* 1. الدخول إلى القسم المرتبط */}
                {lab.section && (
                  <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 mb-6">
                    <h3 className="font-bold text-teal-800 mb-2">🏛️ القسم التابع له المعمل:</h3>
                    <p className="text-slate-800 font-bold text-lg">{lab.section.name !== "string" ? lab.section.name : "قسم العرض العام"}</p>
                    <p className="text-slate-500 text-xs mt-1">{lab.section.description !== "string" ? lab.section.description : ""}</p>
                    
                    {/* الدخول من القسم إلى المعارض التابعة له */}
                    {lab.section.exhibitions && lab.section.exhibitions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-teal-200">
                        <p className="text-xs font-bold text-teal-700 mb-2">🖼️ المعارض الجارية في هذا القسم:</p>
                        <div className="flex flex-wrap gap-2">
                          {lab.section.exhibitions.map((ex, idx) => (
                            <Link to={`/exhibition/${ex.exhibitionId || idx}`} key={idx} className="bg-white px-3 py-1 rounded-lg text-xs text-teal-600 border hover:bg-teal-50">
                              {ex.name || ex}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* الدخول من القسم إلى الموظفين التابعين له */}
                    {lab.section.staff && lab.section.staff.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-teal-200">
                        <p className="text-xs font-bold text-slate-500 mb-2">👥 طاقم العمل العلمي بالقسم:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {lab.section.staff.map((st, idx) => (
                            <div key={idx} className="bg-white p-2 rounded-xl border text-xs">
                              <p className="font-bold text-slate-700">{st.fullName !== "string" ? st.fullName : "أخصائي مرمم"}</p>
                              <p className="text-slate-400 italic text-[10px]">{st.position !== "string" ? st.position : "ترميم دقيق"}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. الدخول إلى القطع الأثرية المرتبطة بالمعمل */}
                {lab.artifacts && lab.artifacts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-sm">🏺 القطع الخاضعة للترميم الفعلي داخل المعمل:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {lab.artifacts.map((art, idx) => (
                        <Link to={`/artifact/${art.artifactId || idx}`} key={idx} className="bg-slate-50 p-3 rounded-xl border hover:bg-slate-100 flex flex-col">
                          <span className="font-bold text-xs text-slate-700">{art.name !== "string" ? art.name : "قطعة ملكية"}</span>
                          <span className="text-[10px] text-teal-600 mt-1">{art.era !== "string" ? art.era : "عصر فرعوني"}</span>
                        </Link>
                      ))}
                    </div>
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

export default ConservationLabs;
