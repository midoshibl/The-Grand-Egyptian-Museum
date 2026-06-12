import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exhibitionService from "../services/exhibitionService";

const ExhibitionDetails = () => {
  const { id } = useParams(); // قراءة الـ ID من الرابط
  const [ex, setEx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التأكد من وجود ID صالح ومكتوب، وأنه ليس كلمة "undefined"
    if (id && id !== "undefined" && id !== "string" && id !== "0") {
      exhibitionService
        .getExhibitionById(id)
        .then((data) => {
          setEx(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("خطأ في الاتصال بالباك إند:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  // 1. شاشة التحميل المتجاوبة أثناء جلب البيانات من الـ API
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-amber-800 animate-pulse">
            جاري جلب تفاصيل المعرض من السيرفر...
          </p>
        </div>
      </div>
    );

  // 2. حماية كاملة: لو السيرفر راجع بـ null أو فاضي تماماً
  if (!ex || Object.keys(ex).length === 0)
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-50 font-cairo px-4 text-center"
        dir="rtl"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm max-w-xl border border-slate-100">
          <span className="text-5xl block mb-4">🏺</span>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
            عذراً، لا توجد بيانات لهذا المعرض
          </h3>
          <p className="text-slate-400 text-sm md:text-base mb-6 leading-relaxed">
            جدول المعارض في الباك إند فارغ حالياً أو أن المعرف المطلق غير صحيح.
            يرجى ملء قاعدة البيانات من الـ Swagger.
          </p>
          <a
            href="/ExhibitionDetails"
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm inline-block shadow hover:bg-amber-600 transition-colors"
          >
            العودة للمعارض
          </a>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-slate-50 pt-[130px] pb-16 px-4 md:px-8 font-cairo text-right"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* زر العودة */}
        <a
          href="/ExhibitionDetails"
          className="mb-6 text-amber-700 font-bold inline-flex items-center gap-2 hover:pr-2 transition-all"
        >
          <span>→</span> العودة للمعارض
        </a>

        {/* 1. الكارت الرئيسي للمعرض (بيانات الباك إند الحقيقية) */}
        <div className="relative h-64 md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 bg-slate-200">
          <img
            src={
              ex.imageUrl && ex.imageUrl !== "string"
                ? ex.imageUrl
                : "https://unsplash.com"
            }
            className="w-full h-full object-cover"
            alt={ex.name}
          />
          {/* حل المشكلة بـ Inline Style مضاد لـ أخطاء الـ Tailwind تماماً */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 md:p-12"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            }}
          >
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
              {ex.name && ex.name !== "string"
                ? ex.name
                : "عنوان المعرض المؤقت"}
            </h1>
            <p className="text-amber-400 font-bold mt-2 text-xs md:text-sm tracking-wide">
              فترة المعرض: {ex.startDate} - {ex.endDate}
            </p>
          </div>
        </div>

        {/* 2. تفاصيل ووصف المعرض والقاعات من الـ API */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-black text-slate-800 mb-4 border-r-4 border-amber-600 pr-3">
              تفاصيل المعرض والوصف الفني
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {ex.description && ex.description !== "string"
                ? ex.description
                : "لا يوجد وصف تفصيلي مسجل لهذا المعرض في قاعدة البيانات حالياً."}
            </p>
          </div>

          {/* كسر تداخل الـ section وعرض الاسم فقط لحماية المتصفح */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h3 className="font-bold text-slate-400 text-xs uppercase mb-2 tracking-widest">
              الجناح المستضيف
            </h3>
            <p className="text-amber-700 font-black text-lg">
              {typeof ex.section === "string"
                ? ex.section
                : ex.section?.name && ex.section.name !== "string"
                  ? ex.section.name
                  : "قاعة العرض المؤقت"}
            </p>
          </div>
        </div>

        {/* 3. شبكة القطع الأثرية المتداخلة القادمة من الـ API بالكامل */}
        <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6">
          القطع المشاركة بالمعرض
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ex.artifactsExhibitions &&
            Array.isArray(ex.artifactsExhibitions) &&
            ex.artifactsExhibitions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden rounded-2xl mb-4 bg-slate-50">
                  <img
                    src={
                      item.artifact?.imageUrl ||
                      item.imageUrl ||
                      "https://placeholder.com"
                    }
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">
                  {item.artifact?.name && item.artifact.name !== "string"
                    ? item.artifact.name
                    : "قطعة ملكية نادرة"}
                </h4>
                <p className="text-xs text-amber-600 font-bold">
                  {item.artifact?.era && item.artifact.era !== "string"
                    ? item.artifact.era
                    : "عصر قديم"}
                </p>
              </div>
            ))}
        </div>

        {/* حالة إذا أرجع الـ API مصفوفة قطع فارغة */}
        {(!ex.artifactsExhibitions || ex.artifactsExhibitions.length === 0) && (
          <div className="text-center py-10 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-medium italic">
            لا توجد قطع أثرية مرتبطة مسجلة داخل هذا المعرض في قاعدة البيانات.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionDetails;
