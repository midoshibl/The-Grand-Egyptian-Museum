import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import artifactService from "../services/artifactService";


function AldarajAleazim() { // غير الاسم لاسم القاعة (مثلاً RamsesHall)
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- أهم جزء: غير الرقم ده في كل قاعة ---
  // قاعة 1 (المسلة)، قاعة 2 (توت)، وهكذا حسب الترتيب في الباك إند
  const SECTION_ID = 3; 

  useEffect(() => {
    artifactService.getAllArtifacts()
      .then(data => {
        // فلترة البيانات عشان تظهر قطع القاعة دي بس
        const filtered = data.filter(item => item.sectionId === SECTION_ID);
        setArtifacts(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-bold">جاري فتح القاعة...</div>;

  return (
    <main dir="rtl" className="font-cairo">
        {/* شريط التنقل العلوي (Breadcrumbs) */}
        <section className="py-[105px]">
            <div className="p-3 bg-white text-[20px] font-medium text-[#4B5563] shadow w-full fixed top-[105px] z-40">
                <div className="container flex gap-2">
                    <Link to="/home">الرئيسية</Link> <span>{`>`}</span>
                    <Link to="/MuseumHalls">القاعات</Link> <span>{`>`}</span>
                    <span className="text-[#CD7F32]">الدرج العظيم</span>
                </div>
            </div>
        </section>

        {/* شبكة الصور والأسماء */}
        <section className="container mx-auto my-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artifacts.map((item) => (
                    <Link to={`/artifact/${item.artifactId}`} key={item.artifactId} className="group">
                        <div className="text-center bg-white p-6 rounded-2rem shadow-sm hover:shadow-xl transition-all border border-gray-100">
                            <img src={item.imageUrl} alt={item.name} className="h-64 w-full object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform" />
                            <h2 className="text-[#4B5563] text-[24px] font-bold group-hover:text-[#CD7F32]">{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            {artifacts.length === 0 && <p className="text-center py-20 text-gray-400">لا توجد قطع معروضة في هذه القاعة حالياً.</p>}
        </section>
    </main>
  );
}

export default AldarajAleazim;
