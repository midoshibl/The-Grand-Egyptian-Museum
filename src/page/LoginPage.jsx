import Login from "../components/StartPg/Login";
import logo from "../assets/images/mask2.png";

function LoginPage() {
  return (
    <>
      {/* الحاوية الرئيسية ممتدة بملء الخلفية وبدون أي تظليل أسود */}
      <section className="start w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat font-cairo overflow-hidden">
        
        <div
          dir="rtl"
          className="w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-between relative"
        >
          
          {/* 
              التعديل السحري: 
              1. جعل حاوية الصورة تأخذ h-screen (طول الشاشة بالكامل).
              2. الصورة تأخذ object-cover وتلتصق باليمين تماماً.
          */}
          <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden select-none pointer-events-none">
            <img
              className=" h-full object-cover object-right"
              src={logo}
              alt="Grand Egyptian Museum Mask"
            />
          </div>
          
          {/* 
              فورم تسجيل الدخول: 
              يتوسط الجانب الآخر بمرونة فائقة مع وجود padding لحماية شاشات التليفون
          */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 z-10 min-h-screen">
            <div className="w-full max-w-md">
              <Login />
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}

export default LoginPage;
