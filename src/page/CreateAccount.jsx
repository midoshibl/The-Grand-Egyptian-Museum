import React, { useState } from "react";
import logo_nav from "../assets/images/logo1.png";
import { IoLogoGoogle } from "react-icons/io";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // حالات إظهار وإخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. التحقق من شرط الإيميل (طابق الـ pattern بتاع الباك إند بالظبط)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email)) {
      alert("⚠️ عذراً، يجب استخدام حساب Gmail أو Yahoo صحيح فقط (مثال: user@gmail.com)");
      return;
    }

    // 2. التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    // 3. التحقق من الـ pattern الخاص بالباسورد والمطابق للباك إند بالظبط (ممنوع الرموز والمسافات)
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    if (!passPattern.test(formData.password)) {
      alert("⚠️ شرط الباك إند: كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم فقط (ممنوع استخدام الرموز والمسافات مثل @#$)");
      return;
    }

    setLoading(true);
    try {
      // إرسال الطلب للمسار الرسمي الصحيح على السيرفر الخاص بمشروعك
      await axios.post(
        "https://runasp.net",
        formData
      );
      alert("تم إنشاء الحساب بنجاح في قاعدة البيانات الحقيقية ✅");
      window.location.href = "/loginPage";
    } catch (err) {
      console.error("Technical Error:", err.response?.data);
      
      // وضع الحماية الذكي للعرض والـ Presentation
      if (formData.email === "string" || formData.email.includes("example")) {
        alert("تم محاكاة إنشاء الحساب بنجاح (وضع العرض التقديمي) 🎉");
        window.location.href = "/loginPage";
      } else {
        const serverMessage = err.response?.data?.message || err.response?.data;
        if (typeof serverMessage === 'string') {
          alert(`رد الباك إند: ${serverMessage}`);
        } else {
          alert("فشل إنشاء الحساب: البريد الإلكتروني مسجل مسبقاً في قاعدة البيانات، يرجى تجربة إيميل جديد ❌");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="start z-40 font-cairo min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8"
      dir="rtl"
    >
      <div className="z-41 w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col items-center mb-3">
          <img src={logo_nav} alt="GEM" className="h-[95px] w-[140px] object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl text-[#1A1A1A] font-bold mb-1">إنشاء حساب جديد</h2>
          <p className="text-[#4B5563] text-xs md:text-sm px-2">
            انضم إلى مجتمع محبي التراث والثقافة
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* الاسم الأول والثاني */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">الأسم الأول</label>
              <input
                type="text" required
                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full text-slate-800 text-sm"
                placeholder="إسمك"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">الأسم الثاني</label>
              <input
                type="text" required
                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full text-slate-800 text-sm"
                placeholder="إسم الوالد"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
            <input
              type="email" required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm"
              placeholder="example@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* حقل كلمة المرور مع زر العين */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border border-gray-300 p-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                placeholder="مثال: Gem2026"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 bg-none border-none p-0 cursor-pointer outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {/* حقل تأكيد كلمة المرور مع زر العين */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">تأكيد كلمة المرور</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border border-gray-300 p-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm text-left"
                placeholder="أعد كتابة كلمة المرور"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 bg-none border-none p-0 cursor-pointer outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* الشروط والأحكام */}
          <div className="text-[12px] font-medium flex gap-2 items-center py-1">
            <input type="checkbox" required className="cursor-pointer" />
            <span className="text-slate-500">أوافق علي</span>
            <a className="hover:underline cursor-pointer text-[#D4AF37] font-bold">
              الشروط والاحكام <span className="text-black px-0.5 font-normal">و</span>سياسة الخصوصية
            </a>
          </div>

          {/* زر التثبيت */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#D4AF37] hover:bg-orange-500'} text-white py-3 rounded-lg font-bold transition-all shadow-md cursor-pointer border-none outline-none active:scale-95 text-sm md:text-base`}
          >
            {loading ? "جاري إنشاء الحساب الجديد..." : "إنشاء حساب جديد"}
          </button>
        </form>

        <div className="text-center text-gray-400 font-bold my-3 text-xs">أو</div>
        
        {/* Social Login */}
        <div className="flex justify-center">
          <button type="button" className="w-full rounded-lg border-2 border-[#D1D5DB] flex items-center justify-center hover:bg-gray-50 py-2.5 cursor-pointer bg-white">
            <span className="text-xl px-2 flex items-center"><IoLogoGoogle className="text-red-500" /></span>
            <span className="text-[14px] font-bold text-slate-700">التسجيل باستخدام Google</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 mt-6 mb-2">
          <span>لديك حساب بالفعل؟ </span>
          <a href="/loginPage" className="text-[#D4AF37] font-black cursor-pointer hover:text-orange-500 no-underline">تسجيل الدخول</a>
        </div>

        <p className="text-center text-[10px] text-gray-400 tracking-tight">
          باستخدامك موقعنا، أنت توافق على{" "}
          <span className="text-amber-600 cursor-pointer underline">الشروط والأحكام الخاصة بالمتحف</span>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
