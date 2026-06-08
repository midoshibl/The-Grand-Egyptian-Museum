import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import logo_nav from "../../assets/images/logo1.png";
import { IoLogoGoogle } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // أضفنا هذا للتنقل
import axios from "axios"; // أضفنا هذا للربط

export default function Login() {
  // --- الجزء البرمجي المضاف ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://grandegyptianmuseum1.runasp.net", {
        email: email,
        password: password
      });

      if (response.data.token) {
        // حفظ التوكن وبيانات المستخدم
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole); // لو الباك إند بيبعت الرول
        
        alert("تم تسجيل الدخول بنجاح ✅");
        navigate("/admin/staff"); // هيوديك لصفحة الموظفين بعد الدخول
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "خطأ في البريد الإلكتروني أو كلمة المرور ❌");
    } finally {
      setLoading(false);
    }
  };
  // -------------------------

  return (
    <div
      className="z-40 font-cairo m-auto flex flex-col items-center rounded-3xl justify-center bg-gray-100"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-3">
          <img src={logo_nav} alt="GEM" className="h-[100px] w-[150px]" />
        </div>

        {/* Title */}
        <div className="container text-center">
          <h2 className="text-center text-lg font-semibold text-[#D4AF37] mb-3">
            تسجيل الدخول
          </h2>
          <p className="text-[#4B5563] mx-7">مرحباً بعودتك إلى المتحف الوطني</p>
        </div>

        {/* Form - أضفنا الـ onSubmit هنا */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm mt-6 text-gray-600 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // ربط الإيميل
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // ربط الباسورد
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="********"
            />
          </div>

          <div className="text-sm text-orange-600 hover:underline cursor-pointer">
            نسيت كلمة المرور؟
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] cursor-pointer hover:bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="text-center text-gray-500 font-bold my-2">أو</div>

        {/* Social Login */}
        <div className="flex justify-center">
          <button className="w-full rounded-lg border-double text-[#374151] border-2 border-[#D1D5DB] flex items-center justify-center hover:bg-gray-100 cursor-pointer">
            <a
              href="https://accounts.google.com/..."
              className="text-xl flex px-6 py-3 gap-2 items-center"
            >
              <IoLogoGoogle />
              <h2 className="text-[15px]">تسجيل الدخول باستخدام جوجل</h2>
            </a>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          لا تمتلك حساب؟{" "}
          <a className="text-[#D4AF37] font-semibold cursor-pointer" href="/CreateAccount"> سجل الآن</a>
        </p>

        <p className="flex justify-center gap-1.5 w-full text-xs text-gray-400 mt-4">
          <span> باستخدامك موقعنا، أنت توافق على</span>
          <a className="text-[#D4AF37] cursor-pointer">الشروط والأحكام</a>
        </p>
      </div>
      <a href="/home" className="flex gap-2 py-1">
        العودة الي الرئيسية <ArrowLeft />
      </a>
    </div>
  );
}
