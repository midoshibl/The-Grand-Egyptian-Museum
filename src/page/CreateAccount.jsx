import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import logo_nav from "../assets/images/logo1.jpg"; // تم ضبط المسار ليعود خطوتين للخلف للفولدر الصحيح
import logo from "../assets/images/mask2.png"; // استدعاء قناع توت عنخ آمون الكبير المفرغ
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

    // 💡 التحقق الفوري محلياً من تطابق كلمتي المرور قبل إرهاق السيرفر
    if (formData.password !== formData.confirmPassword) {
      alert("خطأ: كلمتا المرور غير متطابقتين ❌");
      return;
    }

    setLoading(true);
    try {
      // 💡 إرسال طلب الـ POST الحقيقي والمباشر بالـ Content-Type المطلوب في السواجر بالملي
      const response = await axios.post(
        "https://grandegyptianmuseum1.runasp.net/api/Auth/register-visitor",
        formData,
        {
          headers: {
            "Content-Type": "application/json-patch+json"
          }
        }
      );

      // 💡 قراءة رسالة النجاح الحقيقية الراجعة من السيرفر كود 200 كما هي في الـ Response body
      if (response.data) {
        const successMessage = response.data.message || "تم إنشاء حساب الزائر بنجاح! استمتع برحلتك في GEM ✅";
        alert(successMessage);
        
        // التحويل التلقائي الفوري لصفحة تسجيل الدخول لكي يدخل بحسابه الجديد حقيقياً
        window.location.href = "/loginPage";
      }
    } catch (err) {
      console.error("Technical Registration Error:", err.response?.data);
      
      // طباعة رسالة الرفض الأصلية من الباك إند في حال كان الحساب مسجل مسبقاً أو الباسورد ضعيف
      const serverMessage = err.response?.data?.message || err.response?.data;
      if (typeof serverMessage === 'string') {
        alert(`فشل إنشاء الحساب: ${serverMessage}`);
      } else {
        alert("خطأ في إنشاء الحساب: يرجى التأكد من كتابة البريد الإلكتروني بشكل صحيح ومطابقة شروط الباك إند ❌");
      }
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
              يأخذ h-screen (طول الشاشة بالكامل) ويلتصق باليمين تماماً، وينكمش تلقائياً في الموبايل.
          */}
          <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden select-none pointer-events-none">
            <img
              className="w-full h-full object-cover object-right"
              src={logo} // قناع توت عنخ آمون (mask2.png) المستورد في الجزء الأول
              alt="Grand Egyptian Museum Mask"
            />
          </div>
          
          {/* 
              صندوق فورم إنشاء الحساب الأصلي الخاص بك:
              يتوسط الجانب الأيسر فوق الخلفية الأصلية مباشرة، مع الالتزام التام بكامل كودك بدون تعديل حرف واحد
          */}
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

              {/* استمارة التسجيل الحقيقية المربوطة بالـ API الصارم كما هي عندك بالملي */}
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

                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                    placeholder="example@gmail.com"
                  />
                </div>

                {/* كلمة المرور وعقدة الـ Confirmation */}
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

                {/* زر تأكيد الحساب الفعلي */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D4AF37] cursor-pointer hover:bg-orange-500 text-white py-3 rounded-lg font-black transition-all shadow-md active:scale-95 border-none outline-none text-sm md:text-base mt-2"
                >
                  {loading ? "جاري إنشاء حسابك الفعلي..." : "إنشاء حساب جديد"}
                </button>
              </form>

              {/* التوجيه لصفحة الدخول لو عنده حساب جاهز */}
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
          
          {/* زر العودة للرئيسية طائر بالجانب لسهولة الاستخدام */}
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


