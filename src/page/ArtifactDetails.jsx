import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const ArtifactDetails = () => {
  const { id } = useParams(); // استخراج الـ ID من الرابط
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // جلب بيانات قطعة واحدة (تأكد من وجود الـ Endpoint في الباك إند)
    api.get(`/api/Artifact/${id}`).then(res => setItem(res.data.data));
  }, [id]);

  if (!item) return <div className="text-center p-20">جاري تحميل تفاصيل القطعة...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-[120px] font-cairo" dir="rtl">
      <button onClick={() => navigate(-1)} className="mb-8 text-amber-700 font-bold flex items-center gap-2">
        <span>←</span> العودة للمعرض
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        {/* الصورة في جانب */}
        <div className="md:w-1/2 h-[500px]">
          <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
        </div>

        {/* البيانات في الجانب الآخر */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <span className="text-amber-600 font-black tracking-widest text-xs uppercase mb-2">{item.era}</span>
          <h1 className="text-4xl font-black text-slate-900 mb-6">{item.name}</h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-slate-600 leading-relaxed text-lg">
              {item.description}
            </p>
            <div className="flex gap-4">
              <span className="bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-500">المادة: {item.material}</span>
              <span className="bg-amber-50 px-4 py-2 rounded-xl text-sm font-bold text-amber-700">{item.section?.name}</span>
            </div>
          </div>

          <button className="bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-amber-600 transition-all">
           <a href="/Ticket"> حجز جولة لمشاهدة القطعة</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
