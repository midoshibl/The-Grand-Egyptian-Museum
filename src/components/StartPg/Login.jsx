import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import logo_nav from "../../assets/images/logo1.jpg"; // تأكد من الامتداد png أو jpg حسب مجلدك
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // إرسال البيانات الحقيقية بالملي إلى الباك إند
      const response = await axios.post("https://grandegyptianmuseum1.runasp.net/api/Auth/login", {
        email: email,
        password: password
      });

      // 💡 قراءة الاستجابة الحقيقية الماثلة في السواجر أمامك بالملي
      if (response.data && response.data.status === "Success") {
        const userData = response.data.data;
        const userRole = userData?.role || "Visitor";
        const displayName = userData?.displayName || "Tarek Alsayed Sobhi";
        const isAuthenticated = userData?.isAuthenticated || false;

        // 💡 التعديل الإجباري: لقط الـ userId الرقمي الحقيقي للموظف القادم من الباك إند
        const staffIdFromId = userData?.userId || userData?.Id || "1";

        if (isAuthenticated) {
          // تخزين مفاتيح الجلسة الحقيقية لتتعرف عليها باقي الصفحات والـ Navbar
          localStorage.setItem("token", "true-authenticated-session");
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userRole", userRole); 
          localStorage.setItem("displayName", displayName);
          localStorage.setItem("employeeCheckInTime", new Date().toISOString());

          // 💡 الإضافة الوحيدة والسحرية: حفظ الـ ID الحقيقي المعزول للموظف المفتوح حالياً لكي تقرأه صفحات الحضور والمهام والداشبورد وتفصل داتا الموظفين فوراً
          localStorage.setItem("userStaffId", String(staffIdFromId));

          // 💡 السطرين السحريين: تصفير وتطهير كاش البصمات القديمة فوراً عند الدخول الجديد لتفتح الأزرار طلقة
          localStorage.removeItem("employeeCheckInTimeReal");
          localStorage.removeItem("employeeCheckOutTimeReal");

          alert(`مرحباً بعودتك، ${displayName} ✅`);

          if (userRole === "Admin" || userRole === "admin") {
            window.location.href = "/MyDashboard"; 
          } else {
            window.location.href = "/MyDashboard"; 
          }
          return;
        }

      }
    } catch (err) {
      console.error("Technical Login Error:", err.response?.data);
      
      // طباعة رسالة الخطأ الحقيقية المكتوبة في الباك إند
      const serverMessage = err.response?.data?.message || err.response?.data;
      if (typeof serverMessage === 'string') {
        alert(serverMessage);
      } else {
        alert("خطأ في البريد الإلكتروني أو كلمة المرور ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="z-40 font-cairo min-h-screen flex flex-col items-center justify-center px-4 pt-12 w-full text-right"
      dir="rtl"
    >
      {/* كارت تسجيل الدخول متجاوب بالكامل مع أبعاد الموبايل واللابتوب */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        
        {/* قسم الشعار المعتمد */}
        <div className="flex flex-col items-center mb-3">
          <img src={logo_nav} alt="GEM" className="h-[100px] w-[150px] object-contain" />
        </div>

        {/* رأس الكارت */}
        <div className="text-center mb-6">
          <h2 className="text-center text-xl font-bold text-[#D4AF37] mb-2">
            تسجيل الدخول
          </h2>
          <p className="text-[#4B5563] text-sm">مرحباً بعودتك إلى المتحف الوطني</p>
        </div>

        {/* استمارة تسجيل الدخول المربوطة بالـ API الصارم الفعلي */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm md:text-base text-left"
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800 text-sm md:text-base text-left"
              placeholder="********"
            />
          </div>

          <div className="text-sm text-orange-600 hover:underline cursor-pointer font-bold">
            نسيت كلمة المرور؟
          </div>

          {/* زر الإرسال المتجاوب والحيوي */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] cursor-pointer hover:bg-orange-500 text-white py-3 rounded-lg font-black transition-all shadow-md active:scale-95 border-none outline-none text-sm md:text-base"
          >
            {loading ? "جاري التحقق من الهوية الرقمية..." : "تسجيل الدخول"}
          </button>
        </form>

        {/* التوجيه لإنشاء حساب جديد للزوار */}
        <p className="text-center text-sm text-gray-600 mt-6">
          لا تمتلك حساب زائر؟{" "}
          <a className="text-[#D4AF37] font-bold cursor-pointer no-underline hover:underline" href="/CreateAccount"> سجل الآن</a>
        </p>

        {/* الشروط والأحكام */}
        <p className="flex justify-center flex-wrap gap-1 w-full text-[11px] text-gray-400 mt-4 text-center">
          <span>باستخدامك موقعنا، أنت توافق على</span>
          <a className="text-[#D4AF37] cursor-pointer underline">الشروط والأحكام</a>
        </p>
      </div>
      
      {/* زر الرجوع للرئيسية الأسفل */}
      <a href="/home" className="flex gap-2 py-4 text-slate-500 hover:text-amber-600 transition-colors font-bold text-sm no-underline">
        العودة إلى الرئيسية <ArrowLeft size={18} />
      </a>
    </div>
  );
}
