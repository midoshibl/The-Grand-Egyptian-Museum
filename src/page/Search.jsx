import React, { useState } from "react";
import { Link } from "react-router-dom";
import artifactService from "../services/artifactService";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة البحث مع كل تغيير في الإدخال
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 1) {
      setLoading(true);
      try {
        const data = await artifactService.searchArtifacts(value);
        setResults(data);
      } catch (err) {
        console.error("خطأ في البحث:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-10 px-4 md:px-8 font-cairo" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* قسم العنوان والبحث - متجاوب */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-6">
            استكشف كنوز المتحف
          </h1>
          
          <div className="relative shadow-xl rounded-2xl overflow-hidden">
            <input
              type="text"
              placeholder="اكتب اسم القطعة..."
              className="w-full p-4  md:p-5 pr-12 text-sm md:text-lg border-none outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full"></div>
              ) : (
                <span className="">🔍</span>
              )}
            </div>
          </div>
        </div>

        {/* عرض النتائج - Grid متجاوب */}
        {/* 
            grid-cols-1: موبايل (عمود واحد)
            sm:grid-cols-2: تابلت (عمودين)
            lg:grid-cols-3: لابتوب (3 أعمدة)
            xl:grid-cols-4: شاشات كبيرة (4 أعمدة)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((item) => (
            <Link 
              to={`/artifact/${item.artifactId}`} 
              key={item.artifactId} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* قسم الصورة */}
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] px-2 py-1 rounded-lg font-bold">
                  {item.era}
                </div>
              </div>

              {/* قسم البيانات */}
              <div className="p-5 text-center">
                <h3 className="font-bold text-slate-800 text-base md:text-lg group-hover:text-amber-700 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1 italic">
                  {item.material}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* رسالة حالة البحث */}
        {searchTerm.length > 1 && results.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">عذراً، لم نجد نتائج تطابق "{searchTerm}"</p>
          </div>
        )}
        
        {searchTerm === "" && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[3rem]">
            <p className="text-gray-300 text-xl font-bold italic">اكتب لتبدأ البحث في مقتنيات المتحف...</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
