import kouo from "../../assets/images/kovo.jpg";
import Malok from "../../assets/images/molok.jpg";
import Tot from "../../assets/images/Tot.png";

function SomeHalls() {
  const items = [
    {
      imges: Malok,
      title: "قاعات العرض الرئيسية",
      dis: "تعرف على ملوك وملكات مصر القديمة",
      a: "/MainHalls",
    },
    {
      imges: Tot,
      title: "قاعة توت عنخ آمون",
      dis: "اكتشف كنوز الملك الذهبي الصغير",
      a: "/TutHall",
    },
    {
      imges: kouo,
      title: "مراكب الملك خوفو",
      dis: "التماثيل الضخمة والآثار الفرعونية",
      a: "/KingKhufu",
    },
  ];

  return (
    <section dir="rtl" className="w-full h-auto mt-2 font-cairo px-2 md:px-4">
      {/* 
          الشبكة متجاوبة بالكامل:
          grid-cols-1: للموبايل (كارت عريض مريح للعين)
          md:grid-cols-2: للتابلت (كارتين بالسطر)
          lg:grid-cols-3: للابتوب (3 كروت متراصة بالملي)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-4">
        {items.map((item, index) => (
          <a 
            href={item.a} 
            key={index} 
            className="group no-underline block hover:no-underline"
          >
            {/* الحواف rounded-2xl في الموبايل وتكبر لـ rounded-[2rem] في اللابتوب لتناسق الأبعاد */}
            <div className="bg-[#D4AF37] rounded-2xl md:rounded-2rem overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between h-full border border-amber-500/20">
              
              {/* حاوية الصورة: h-48 للموبايل لتوفير المساحة، وتكبر في الشاشات الأكبر */}
              <div className="overflow-hidden h-48 sm:h-56 md:h-64 bg-slate-900 flex items-center justify-center">
                <img
                  src={item.imges}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* تفاصيل الكارت: نصوص مرنة تصغر في الشاشات الصغيرة وتكبر تلقائياً */}
              <div className="p-5 md:p-6 text-center text-amber-50 grow flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-black mb-1.5 md:mb-2 tracking-tight group-hover:text-slate-900 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm font-medium text-amber-100/90 leading-relaxed italic line-clamp-2">
                  {item.dis}
                </p>
              </div>

            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SomeHalls;
