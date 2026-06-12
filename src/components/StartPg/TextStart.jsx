import { ArrowBigLeftDash } from 'lucide-react';

function TextStart() {
  return (
    // الحاوية واخذة max-w-xl لضمان عدم تشتت الكلمات في الشاشات الكبيرة وpx-4 لحماية الموبايل
    <div className="m-auto text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white h-fit z-40 max-w-xl text-center font-black font-cairo px-4">
        
        {/* ضبط الهامش السفلي ليكون مرناً ومريحاً للعين على كل الأجهزة */}
        <p className="text-center mb-6 md:mb-10 leading-tight drop-shadow-xl">
          مرحباً بكم في
          <br />
          <span className="text-amber-400 drop-shadow-md">المتحف المصري الكبير</span>
        </p>
        
        {/* زر البدء بأبعاد مرنة ونصوص تصغر تلقائياً في الجوال لعدم كسر التنسيق */}
        <button className="bg-amber-500 text-white transition-all duration-300 text-xl md:text-2xl py-3 px-8 md:py-4 md:px-12 hover:scale-95 hover:bg-amber-600 rounded-full shadow-2xl border-none outline-none font-bold active:scale-90 cursor-pointer">
          <a className="flex items-center justify-center gap-3 no-underline text-white" href="/home">
            <span>ابدأ الرحلة</span> 
            <ArrowBigLeftDash size={24} className="animate-pulse" />
          </a>
        </button>

    </div>
  );
}

export default TextStart;
