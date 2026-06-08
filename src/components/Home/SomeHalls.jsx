import { a } from "framer-motion/client";
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
    <section dir="rtl" className="container h-[532px] mt-4 font-cairo">
      <div className="relative flex justify-between mx-4 my-5 pb-15">
        {items.map((item) => (
          <a href={item.a}>
            <div key={item} className="bg-[#D4AF37]  mx-4 ">
              <div className=" overflow-hidden">
                <img
                  src={item.imges}
                  alt=""
                  className="bg-black transition-all w-[260px] h-[220px] p-1 ease-in-out duration-500 hover:scale-105 "
                />
              </div>
              <div className="cursor-pointer w-full py-6 text-amber-50">
                <h2 className="">{item.title}</h2>
                <p>{item.dis}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SomeHalls;
