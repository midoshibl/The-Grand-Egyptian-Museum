import header from "../assets/images/back-startpage.jpeg";
import {
  DoorOpen,
  DoorClosed,
  CalendarCheck,
  Users,
  Ticket,
  Clock2,
  Accessibility,
  Sun,
  Moon,
  CalendarX,
  TicketsIcon,
  MapPin,
} from "lucide-react";
function Visit() {
  return (
    <div className="pt-[105px]" dir="rtl">
      <section className=" h-[550px]  relative">
        <img
          src={header}
          alt=""
          className="max-w-full w-full max-h-full object-cover object-top"
        />
        <div className="text-center w-full absolute inset-0 bg-black/60 flex flex-col space-y-9 justify-center ">
          <h2 className="text-[48px] text-white">أوقات الزيارة</h2>
          <p className="text-[#E5E7EB] text-[20px]">
            نرحب بكم في المتحف الوطني. تعرف على أوقات العمل والزيارة لتخطط
            لرحلتك الثقافية بأفضل شكل ممكن
          </p>
        </div>
      </section>
      <section>
        <div className="text-center my-12">
          <h2 className="text-[30px] text-[#1F2937]">أوقات العمل الرسمية</h2>
          <p className="text-[18px] text-[#4B5563]">
            المتحف مفتوح يومياً للزوار من جميع أنحاء العالم
          </p>
        </div>
        <section className="space-y-12 text-center ">
          <section className="flex justify-center gap-8">
            <div className="bg-[#BBF7D0] w-[346px] h-[262px] flex flex-col justify-center items-center  space-y-4 rounded-3xl shadow">
              <span className="bg-[#16A34A] p-2  rounded-full">
                <DoorOpen color="white" />
              </span>
              <h2 className="text-[#374151] text-[18px]">وقت الافتتاح</h2>
              <p className="text-[#15803D] text-[36px] w-[90px] ">
                09:00 صباحاً
              </p>
            </div>
            <div className="bg-[#BFDBFE] w-[346px] h-[262px] flex flex-col justify-center items-center space-y-4 rounded-3xl shadow">
              <span className="bg-[#2563EB] p-2  rounded-full">
                <DoorClosed color="white" />
              </span>
              <h2 className="text-[#374151] text-[18px]">وقت الإغلاق</h2>
              <p className="text-[#1D4ED8] text-[36px] w-[90px]">06:00 مساءً</p>
            </div>
            <div className="bg-[#E9D5FF] w-[346px] h-[262px] flex flex-col justify-center items-center space-y-4 rounded-3xl shadow">
              <span className="bg-[#9333EA] p-2  rounded-full">
                <CalendarCheck color="white" />
              </span>
              <h2 className="text-[#374151] text-[18px]">حالة المتحف</h2>
              <p className="text-[#15803D] text-[36px] flex  items-center gap-4 bg-[#BBF7D0] rounded-3xl px-4 py-2 ">
                <h2 className="w-2 h-2 bg-[#22C55E] rounded-full"></h2>
                مفتوح يومياً
              </p>
            </div>
          </section>
          <section className="bg-[#E5E7EB] w-[1104px] h-[232px] text-center space-y-5 rounded-3xl m-auto shadow">
            <h2 className="text-[30px] text-[#1F2937] pt-4">معلومات إضافية</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6  justify-items-center ">
              <div className="text-[16px] flex gap-4 text-right  w-[504px]">
                <span className="p-3  rounded bg-[#FFEDD5] text-[#EA580C]">
                  <Users />
                </span>
                <div>
                  <h2 className="text-[#1F2937]">أوقات الذروة</h2>
                  <p className="text-[#4B5563]">
                    10:00 ص - 2:00 م | 4:00 م - 6:00 م
                  </p>
                </div>
              </div>
              <div className="text-[16px] flex gap-4 text-right w-[504px]">
                <span className="p-3  rounded bg-[#BBF7D0] text-[#15803D]">
                  <Ticket />
                </span>
                <div>
                  <h2 className="text-[#1F2937]">آخر موعد لبيع التذاكر</h2>
                  <p className="text-[#4B5563]">5:00 مساءً</p>
                </div>
              </div>
              <div className="text-[16px] flex gap-4 text-right w-[504px]">
                <span className="p-3  rounded  bg-[#BFDBFE] text-[#2563EB]">
                  <Clock2 />
                </span>
                <div>
                  <h2 className="text-[#1F2937]">مدة الزيارة المقترحة</h2>
                  <p className="text-[#4B5563]">2-3 ساعات للجولة الكاملة</p>
                </div>
              </div>
              <div className="text-[16px] flex gap-4 text-right w-[504px]">
                <span className="p-3 rounded text-[#9333EA] bg-[#E9D5FF]">
                  <Accessibility />
                </span>
                <div>
                  <h2 className="text-[#1F2937] ">إمكانية الوصول</h2>
                  <p className="text-[#4B5563]">متاح لذوي الاحتياجات الخاصة</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <section className="bg-[#E5E7EB] h-[486px] mt-10 text-center ">
        <h2 className="text-[#1F2937] text-[30px] py-[58px] ">أوقات خاصة ومناسبات</h2>
        <div className="flex justify-center gap-6">
          <div className=" w-[352px] h-[274px] flex flex-col justify-center items-center bg-white rounded-2xl shadow">
            <span className="bg-[#FEF9C3] text-[#CA8A04] p-2  rounded-full"> <Sun /></span>
            <h2 className="text-[#1F2937] text-[20px] mb-4">عطلة نهاية الأسبوع</h2>
            <div className=" w-[140px] text-[16px] space-y-4">
              <p className="text-[#1F2937]">الجمعة والسبت</p>
              <p className="text-[#4B5563]">09:00 ص - 08:00 م</p>
              <p className="text-[#166534] text-[14px]">ساعات إضافية</p>
            </div>
          </div>
          <div className=" w-[352px] h-[274px] flex flex-col justify-center items-center bg-[#ffff] rounded-2xl shadow-2xl">
            <span className="bg-[#E0E7FF] text-[#4F46E5] p-2  rounded-full"><Moon /></span>
            <h2 className="text-[#1F2937] text-[20px] mb-4">شهر رمضان</h2>
            <div className=" w-[140px] text-[16px] space-y-4">
              <p className="text-[#1F2937]">أوقات خاصة</p>
              <p className="text-[#4B5563]">10:00 ص - 04:00 م</p>
              <p className="text-[#1E40AF] text-[14px]">ساعات محدودة</p>
            </div>
          </div>
          <div className=" w-[352px] h-[274px] flex flex-col justify-center items-center bg-white rounded-2xl shadow-2xl">
            <span className="bg-[#FEE2E2] text-[#DC2626] p-2  rounded-full"><CalendarX /></span>
            <h2 className="text-[#1F2937] text-[20px] mb-4">العطل الرسمية</h2>
            <div className=" w-[150px] text-[16px] space-y-4">
              <p className="text-[#1F2937]">حسب التقويم الرسمي</p>
              <p className="text-[#4B5563]">مغلق أو مواعيد خاصة</p>
              <p className="text-[#991B1B] text-[14px]">يرجى التأكد</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#2563EB] h-[352px] ">
        <div className="w-fit  text-center m-auto  py-[60px] space-y-11">
          <h2 className="text-[36px] text-[#FFFFFF]">جاهز لزيارة المتحف؟</h2>
          <p className="text-[20px] text-[#F5F2ED]">احجز تذكرتك الآن واستمتع بتجربة ثقافية لا تُنسى</p>
          <div className="space-x-11 flex">
            <a href="/Ticket" className="hover:bg-amber-700 duration-150 text-[20px] text-[#2563EB]  bg-[#E5E7EB] px-11 py-4 flex gap-3 items-center" ><TicketsIcon/> احجز زيارتك الآن</a>
            <a href="/" className="  text-[20px] text-[#E5E7EB] border border-[#E5E7EB] px-10 py-3 flex gap-3 items-center"> <MapPin /> اعرض الموقع</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Visit;
