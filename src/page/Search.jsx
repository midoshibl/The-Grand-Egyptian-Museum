import React, { useState } from "react";
import artifactService from "../services/artifactService";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة البحث التفاعلية مع كل تغيير في الإدخال
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 1) {
      setLoading(true);
      try {
        const data = await artifactService.searchArtifacts(value);
        // التحقق من مصفوفة البيانات القادمة من الباك إند
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("خطأ في جلب نتائج البحث:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    // 💡 تم تحديث pt-36 md:pt-44 لمنع تداخل شريط البحث خلف الناف بار الثابت العلوي تماماً بالملي
    <main className="min-h-screen bg-gray-50 pt-36 md:pt-44 pb-16 px-4 md:px-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* قسم العنوان وحقل البحث - متجاوب وانسيابي */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            استكشف كنوز المتحف
          </h1>
          
          <div className="relative shadow-xl rounded-2xl overflow-hidden border border-amber-100 bg-white">
            <input
              type="text"
              placeholder="اكتب اسم القطعة الأثرية للبحث..."
              className="w-full p-4 md:p-5 pr-12 text-sm md:text-lg border-none outline-none focus:ring-2 focus:ring-amber-500 transition-all text-slate-800 font-medium"
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* أيقونة البحث / مؤشر التحميل المتجاوب */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full"></div>
              ) : (
                <span className="text-lg md:text-xl">🔍</span>
              )}
            </div>
          </div>
        </div>

        {/* عرض النتائج - شبكة (Grid) متجاوبة 100% مع كافة الشاشات */}
        {/* 
            grid-cols-1: للموبايل (كارت عريض مريح للعين واللمس)
            sm:grid-cols-2: للتابلت الصغير (كارتين بالسطر)
            lg:grid-cols-3: للابتوب (3 كروت بالسطر)
            xl:grid-cols-4: للشاشات الكبيرة (4 كروت متناسقة بالملي)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {results.map((item) => (
            <a 
              href={`/Artifact/${item.artifactId}`} // التوجيه الآمن بـ href المتوافق مع مساراتك الرسمية بحرف كبير
              key={item.artifactId} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full no-underline"
            >
              {/* قسم الصورة المرن */}
              <div className="h-56 md:h-64 overflow-hidden relative bg-slate-50">
                <img 
                  src={item.imageUrl && item.imageUrl !== "string" ? item.imageUrl : 'https://unsplash.com'} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* وسم العصر التاريخي فوق الصورة */}
                {item.era && item.era !== "string" && (
                  <div className="absolute top-4 right-4 bg-amber-600/90 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-xl font-bold shadow">
                    {item.era}
                  </div>
                )}
              </div>

              {/* قسم تفاصيل المقتنيات المسترجعة من الـ API */}
              <div className="p-5 text-center bg-white grow flex flex-col justify-center">
                <h3 className="font-black text-slate-800 text-base md:text-lg group-hover:text-amber-700 transition-colors line-clamp-2 leading-tight">
                  {item.name !== "string" ? item.name : "تحفة أثرية ملكية"}
                </h3>
                <p className="text-gray-400 text-xs mt-1 font-medium italic">
                  {item.material !== "string" ? item.material : "مادة فرعونية نادرة"}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* رسائل حالات محرك البحث التفاعلية */}
        {searchTerm.length > 1 && results.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 max-w-xl mx-auto shadow-sm">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-slate-400 text-base md:text-lg font-bold">عذراً، لم نجد قطع أثرية تطابق المسمى "{searchTerm}"</p>
            <p className="text-slate-300 text-xs mt-1">يرجى تجربة كلمات أخرى مثل (تمثال، قناع، ذهب).</p>
          </div>
        )}
        
        {searchTerm === "" && (
          <div className="text-center py-16 md:py-24 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2.5rem] md:rounded-[4rem] max-w-4xl mx-auto">
            <span className="text-5xl block mb-4 animate-bounce">🏺</span>
            <p className="text-slate-400 text-lg md:text-xl font-black italic">اكتب لتبدأ البحث في مقتنيات وكنوز المتحف الحقيقية...</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
