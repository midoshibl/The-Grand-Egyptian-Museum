import React, { useState } from "react";
import logo_nav from "../assets/images/logo1.png";
import { IoLogoGoogle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  // --- الجزء البرمجي المطور للربط بنجاح ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. التحقق من شرط الإيميل (gmail أو yahoo فقط)
    const emailPattern = /@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email)) {
      alert("⚠️ عذراً، يجب استخدام حساب Gmail أو Yahoo فقط");
      return;
    }

    // 2. التحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    // 3. التحقق من تعقيد كلمة المرور (حرف كبير، صغير، رقم، وبدون رموز)
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    if (!passPattern.test(formData.password)) {
      alert("⚠️ كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم (ممنوع الرموز مثل @#$)");
      return;
    }

    setLoading(true);
    try {
      // إرسال الطلب للسيرفر
      await axios.post(
        "http://runasp.net",
        formData
      );
      alert("تم إنشاء الحساب بنجاح ✅");
      navigate("/loginPage");
    } catch (err) {
      console.error("Technical Error:", err.response?.data);
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        // عرض رسائل الخطأ التفصيلية من الباك إند
        alert(Object.values(serverErrors).flat().join("\n"));
      } else {
        alert("حدث خطأ");
      }
    } finally {
      setLoading(false);
    }
  };
  // --------------------------------------

  return (
    <div
      className="start z-40 font-cairo m-auto flex items-center justify-center bg-gray-100"
      dir="rtl"
    >
      <div className="z-41">
        <div className="w-fit max-w-md bg-white rounded-2xl shadow-lg px-8 py-4">
          <div className="flex flex-col items-center ">
            <img src={logo_nav} alt="GEM" className="h-[95px] w-[140px]" />
          </div>

          {/* Title */}
          <div className="container text-center">
            <h2 className="text-[25px] text-[#1A1A1A] font-bold">إنشاء حساب جديد</h2>
            <p className="text-[#4B5563] mx-7">
              انضم إلى مجتمع محبي التراث والثقافة
            </p>
          </div>

          {/* Form - أضفنا onSubmit هنا */}
          <form className="space-y-2 mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">الأسم الأول</label>
                <input
                  type="text" required
                  className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                  placeholder="إسمك"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">الأسم الثاني</label>
                <input
                  type="text" required
                  className="rounded-lg border text-[15px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                  placeholder="إسم الوالد"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mt-2 text-gray-600 mb-1">البريد الإلكتروني</label>
              <input
                type="email" required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="example@gmail.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">كلمة المرور</label>
              <input
                type="password" required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="مثال: Gem12345"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">تأكيد كلمة المرور</label>
              <input
                type="password" required
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="أعد كتابة الباسورد"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <div className="text-[12px] flex gap-2.5 items-center py-2">
              <input type="checkbox" required className="cursor-pointer" />
              <h2> أوافق علي</h2>
              <a className="hover:underline cursor-pointer text-[#D4AF37] ">
                الشروط والاحكام <span className="text-black px-1 mb-2.5">و</span>سياسة الخصوصية
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#D4AF37] hover:bg-orange-400'} text-white py-3 rounded-lg font-semibold transition-all shadow-md cursor-pointer`}
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
            </button>
          </form>

          <div className="text-center text-gray-500 font-bold my-2 text-sm">أو</div>
          
          {/* Social Login */}
          <div className="flex justify-center">
            <button type="button" className="w-full rounded-lg border-2 border-[#D1D5DB] flex items-center justify-center hover:bg-gray-100 py-2 cursor-pointer transition-colors">
              <span className="text-xl px-2"><IoLogoGoogle /></span>
              <span className="text-[14px] font-semibold">التسجيل باستخدام Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 my-4 ">
            <span>لديك حساب بالفعل؟ </span>
            <a href="/loginPage" className="text-[#D4AF37] font-bold cursor-pointer hover:text-orange-400">تسجيل الدخول</a>
          </div>

          <p className="text-center text-xs text-gray-400 pb-2">
            باستخدامك موقعنا، أنت توافق على{" "}
            <span className="text-orange-600 cursor-pointer">الشروط والأحكام</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
