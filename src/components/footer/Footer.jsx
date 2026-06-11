import logo_nav from "../../assets/images/logo1.png";
import { Phone, MapPin ,X } from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram} from "react-icons/fa";

function Footer() {
  return (
    <div
      className=" footer bottom-0 left-0 w-full  font-medium font-cairo bg-[#1F2937] select-none  "
      dir="rtl"
    >
      <div className="container flex justify-between py-9">
        <div className=" flex flex-col w-[400px] -mt-7 items-center justify-center">
          {/* <img src={logo_nav} alt="logo" className=" w-[255px] " /> */}
          <h2 className="text-[15px] text-[#FFFFFF]">المتحف المصري الكبير</h2>
          <p className="text-[12px] text-[#D1D5DB]">
            أكبر متحف أثري في العالم يضم كنوز الحضارة المصرية القديمة
          </p>
        </div>
        <div className="items-start w-[150px]">
          <h2 className="text-[#FFFFFF]">روابط سريعة</h2>
          <ul className="text-[#D1D5DB] cursor-pointer ">
            <li className="hover:text-[#D4AF37] mb-2"><a href="/home">الرئيسية</a></li>
            <li className="hover:text-[#D4AF37] mb-2"><a href="/MuseumHalls">القاعات</a></li>
            <li className="hover:text-[#D4AF37] mb-2"><a href="/ExhibitionDetails">المعارض المؤقتة</a></li>
            <li className="hover:text-[#D4AF37] mb-2"><a href="/Booking">حجز التذكرة</a></li>
            <li className="hover:text-[#D4AF37] mb-2"><a href="/TheMuseum">عن المتحف</a></li>
          </ul>
        </div>
        <div className="w-[300px]">
          <h2 className="text-[#FFFFFF]">معلومات التواصل</h2>
          <ul className="text-[#D1D5DB] ">
            <li className="flex gap-1.5">
              <Phone size={20} />
              <h2 dir="ltr">+20 0233 7634 86</h2>
            </li>
            <li className="flex gap-1.5 ">
              <MapPin size={25} />
              <h2 className="text-[10px]">
                طريق القاهرة - الإسكندرية الصحراوي، كفر نصار، الهرم، محافظة
                الجيزة 3513204، مصر.
              </h2>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-[#FFFFFF]">تابعنا</h2>
          <ul className="flex  gap-4">
            <li className=" bg-[#D4AF37] rounded-full p-3 ">
              <a href=""><FaFacebook size={28} color="blue" /></a>
            </li>
            <li className=" bg-[#D4AF37] rounded-full p-3 ">
             <a href=""><FaInstagram size={28} /></a>
            </li>
            <li className=" bg-[#D4AF37] rounded-full p-3 ">
              <a href="">
                <X size={28} className="text-black" />

              </a>
            </li>
            <li className=" bg-[#D4AF37] rounded-full p-3 ">
              <a href=""><FaYoutube size={28} color="red" /></a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="container w-full h-0.5 text-[#D1D5DB] py-5"/>
      <div className="container text-center text-[#D1D5DB] pb-4">
        © 2026 المتحف المصري الكبير. جميع الحقوق محفوظة.
      </div>
    </div>
  );
}

export default Footer;
