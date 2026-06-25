import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import logo_nav from "../assets/images/logo1.jpg"; // شعار المتحف الصغير
import logo from "../assets/images/mask2.png"; // قناع توت عنخ آمون الكبير
import axios from "axios";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // 💡 1. فحص تطابق كلمتي المرور (Compare)
    if (formData.password !== formData.confirmPassword) {
      alert("يرجى تأكيد كلمة المرور: تنبيه: كلمة المرور وتأكيدها غير متطابقين ⚠️");
      return;
    }

    // 💡 2. فحص صيغة الإيميل المعتمدة (Gmail أو Yahoo فقط)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailRegex.test(formData.email)) {
      alert("عذراً، يجب استخدام حساب Gmail أو Yahoo فقط ⚠️");
      return;
    }

    // 💡 3. فحص قوة وشروط الباسورد (حروف كبيرة وصغيرة وأرقام وبدون رموز)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(formData.password)) {
      alert("يجب أن تحتوي كلمة المرور على أرقام وحروف كبيرة وصغيرة، ولا يسمح بالرموز ⚠️");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://runasp.net",
        formData,
        {
          headers: {
            "Content-Type": "application/json-patch+json"
          }
        }
      );

      if (response.data) {
        alert(response.data.message || "تم إنشاء حساب الزائر بنجاح! استمتع برحلتك في GEM ✅");
        window.location.href = "/loginPage";
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      // قراءة رسائل الأخطاء الصارمة الراجعة من الـ DataAnnotations بداخل السيرفر
      const serverMessage = err.response?.data?.message || err.response?.data?.errors?.Email?.[0] || err.response?.data?.errors?.Password?.[0] || err.response?.data;
      alert(typeof serverMessage === 'string' ? `فشل التسجيل: ${serverMessage}` : "خطأ: البيانات غير مطابقة لشروط السيرفر الصارمة ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* 
          1. كلاس start يفرش كخلفية ممتدة على كامل الشاشة وبدون أي تظليل أسود.
          2. استخدام bg-cover و bg-center لضمان أن الصورة تملأ الشاشة بالكامل في الموبايل واللابتوب.
      */}
      <section className="start w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat font-cairo overflow-hidden">
        
        <div
          dir="rtl"
          className="w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-between relative"
        >
          
          {/* 
              قناع توت عنخ آمون الجانبي (المفرغ):
              يأخذ h-screen (طول الشاشة بالكامل) ويلتصق باليمين تماماً، وينكمش تلقائياً في الموبايل لحماية مساحة الفورم.
          */}
          <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden select-none pointer-events-none">
            <img
              className="w-full h-full object-cover object-right"
              src={logo}
              alt="Grand Egyptian Museum Mask"
            />
          </div>
          
          {/* صندوق فورم إنشاء الحساب يتوسط الجانب الأيسر فوق الخلفية الأصلية مباشرة */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 z-10 min-h-screen">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 text-right">
              
              {/* قسم الشعار المعتمد */}
              <div className="flex flex-col items-center mb-3">
                <img src={logo_nav} alt="GEM" className="h-[100px] w-[150px] object-contain" />
              </div>

              {/* رأس الكارت */}
              <div className="text-center mb-6">
                <h2 className="text-center text-xl font-bold text-[#D4AF37] mb-1">
                  إنشاء حساب زائر جديد
                </h2>
                <p className="text-[#4B5563] text-xs">سجل بياناتك الحقيقية لتتمكن من حجز تذاكر المتحف الفورية</p>
              </div>

              {/* استمارة التسجيل الأصلية الصافية المربوطة بالـ API بالملي */}
              <form className="space-y-4" onSubmit={handleRegister}>
                
                {/* الاسم الأول والأخير متجاوبين جنب بعض باللاب وتحت بعض بالموبايل */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">الاسم الأول</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm"
                      placeholder="Mido"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">الاسم الأخير</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm"
                      placeholder="shibl"
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني - خاضع لشروط Gmail و Yahoo بالإجبار */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">البريد الإلكتروني (Gmail أو Yahoo فقط)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                    placeholder="example@gmail.com"
                  />
                </div>

                {/* كلمة المرور وتأكيد كلمة المرور - خاضعة لشروط الحروف الكبيرة والصغيرة والأرقام وبدون رموز */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">كلمة المرور</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                      placeholder="********"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                      placeholder="********"
                    />
                  </div>
                </div>

                {/* زر إنشاء الحساب الفعلي الصافي */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] cursor-pointer hover:bg-orange-500 text-white py-3 rounded-lg font-black transition-all shadow-md active:scale-95 border-none outline-none text-sm md:text-base mt-2"
                >
                  {loading ? "جاري إنشاء حسابك الفعلي..." : "إنشاء حساب جديد"}
                </button>
              </form>

              {/* التوجيه لصفحة الدخول */}
              <p className="text-center text-sm text-gray-600 mt-6">
                تمتلك حساباً بالفعل؟{" "}
                <a className="text-[#D4AF37] font-bold cursor-pointer no-underline hover:underline" href="/loginPage"> سجل دخولك الآن</a>
              </p>

              {/* الشروط والأحكام */}
              <p className="flex justify-center flex-wrap gap-1 w-full text-[11px] text-gray-400 mt-4 text-center">
                <span>تسجيلك يعني موافقتك الصارمة على</span>
                <a className="text-[#D4AF37] cursor-pointer underline">الشروط والأحكام الخاصة بـ GEM</a>
              </p>
            </div>
          </div>
          
          {/* زر العودة للرئيسية طائر بالخلفية لسهولة العودة */}
          <div className="absolute bottom-4 left-4 z-20">
            <a href="/home" className="flex gap-2 bg-white/80 backdrop-blur-sm shadow px-4 py-2 rounded-xl text-slate-600 hover:text-amber-600 transition-colors font-bold text-sm no-underline">
              العودة إلى الرئيسية <ArrowLeft size={18} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}


