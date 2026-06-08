// import MuseumSlider from "../components/Home/MuseumSlider";
import Sliderimg from "../components/Home/Sliderimg";
import SomeHalls from "../components/Home/SomeHalls";
import { Clock8,MapPin ,Ticket } from 'lucide-react';
function Home() {
  return (
    <>
      <div className="relative">
        <div>
          <div>
            <Sliderimg />
          </div>
          <div className="absolute z-40 w-fit p-5 mt-[250px] left-1/2 -translate-x-1/2 text-center font-cairo text-[#FFFFFF]">
            <h2 className="text-[77px]">المتحف المصري الكبير</h2>
            <p className="my-10 text-[20px]">
              اكتشف كنوز الحضارة المصرية القديمة في أكبر متحف أثري في العالم
            </p>
            <div className="flex justify-center gap-4">
              <a href="/MuseumHalls" className="border-2 border-[#FFFFFF] py-5 px-10 rounded-2xl hover:scale-90 duration-200 ">  استكشف القاعات</a>
              <a href="/Ticket" className="bg-[#D4AF37] py-5 px-10 rounded-2xl hover:scale-90 duration-200 "> احجز تذكرتك الآن</a>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[805px] bg-[#F5F1E8] h-[297px] text-center p-16">
        <h2 className="text-[#1F2937] font-medium text-4xl ">
          رحلة عبر التاريخ
        </h2>
        <p className="text-[#6B7280] pt-10">
          يضم المتحف المصري الكبير أكثر من 100,000 قطعة أثرية تحكي قصة الحضارة
          المصرية العريقة، من عصر ما قبل التاريخ وحتى العصر اليوناني الروماني.
          اكتشف كنوز توت عنخ آمون، والمومياوات الملكية، والتماثيل الضخمة التي
          تجسد عظمة الفراعنة.
        </p>
      </div>
      <div className="h-[532px] text-center p-16">
        <h2 className="text-[#1F2937] font-medium text-4xl ">
          القاعات المميزة
        </h2>
        <p className="text-[#6B7280] pt-8">استكشف أهم القاعات في المتحف</p>
        <div className="container flex justify-between items-center pt-6">
          <SomeHalls />
        </div>
      </div>
      <div className="bg-[#1F2937] w-full text-center  my-10">
        <ul className="container flex justify-between py-[102px] " dir="rtl">
          <li>
            <h2 className="text-[#D4AF37] text-4xl mb-3">100,000+</h2>
            <p className="text-[#ffff]">قطعة أثرية</p>
          </li>
          <li>
            <h2 className="text-[#D4AF37] text-4xl mb-3">5,000</h2>
            <p className="text-[#ffff]">سنة من التاريخ</p>
          </li>
          <li>
            <h2 className="text-[#D4AF37] text-4xl mb-3">15</h2>
            <p className="text-[#ffff]">قاعة عرض</p>
          </li>
          <li>
            <h2 className="text-[#D4AF37] text-4xl mb-3">2M+</h2>
            <p className="text-[#ffff]">زائر سنوياً</p>
          </li>
        </ul>
      </div>
      <div className="container w-full py-6">
        <div className=" text-center items-center " >
          <h2 className="text-[#1F2937] font-medium text-4xl">معلومات الزيارة</h2>
          <div className="py-8">
            <ul className="flex justify-between" dir="rtl">
              <li className="flex flex-col justify-center items-center w-[200px] ">
                <div className=" rounded-full w-fit text-[#ffff] p-2 bg-[#D4AF37]"><Clock8 /></div>
                <h3 className="text-[#1F2937] font-bold py-3.5">أوقات العمل</h3>
                <p className="text-[#6B7280]">يومياً من 9:00 صباحاً حتى 6:00 مساءً</p>
              </li>
              <li className="flex flex-col justify-center items-center w-[200px] ">
                <div className=" rounded-full w-fit text-[#ffff] p-2 bg-[#D4AF37]"><MapPin /></div>
                <h3 className="text-[#1F2937] font-bold py-3.5">الموقع</h3>
                <p className="text-[#6B7280]">الرماية، محافظة الجيزة، مصر</p>
              </li>
              <li className="flex flex-col justify-center items-center w-[200px] ">
                <div className=" rounded-full w-fit text-[#ffff] p-2 bg-[#D4AF37]"><Ticket /></div>
                <h3 className="text-[#1F2937] font-bold py-3.5">أسعار التذاكر</h3>
                <p className="text-[#6B7280]">تبدأ من 200 جنيه للمصريين</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
