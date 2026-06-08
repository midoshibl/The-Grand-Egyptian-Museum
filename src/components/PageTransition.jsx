import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.png";
import { useLocation } from "react-router-dom";


 function PageTransition() {
  const location = useLocation();
  const [showLogo, setShowLogo] = useState(true);
  
  useEffect(() => {
    setShowLogo(true);
    // اللوجو يظل ظاهر 5 ثواني (تقدر تغير المدة)
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      {/* Overlay يغطي كل الصفحة أثناء ظهور اللوجو */}
      {showLogo && (
        <motion.div
          initial={{ opacity: 1 }}
          // animate={{ opacity: 0 }}
          transition={{ ease: "easeOut" }}
          className="fixed inset-0 bg-amber-400 flex items-center justify-center z-50"
        >
          <motion.img
            src={logo}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease:"easeOut" }}
            className="w-60 h-auto origin-bottom"
          />
        </motion.div>
      )}
    </div>
  );
}
export default PageTransition;