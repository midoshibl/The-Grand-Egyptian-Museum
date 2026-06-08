import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";            // ضروري
import "swiper/css/autoplay";   // بسيفيد لو لزم

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img4.jpeg";
import img3 from "../../assets/images/back-startpage.jpeg";

function Sliderimg() {
  const images = [img1, img2, img3];

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIdx); // حدث الخلفية فورًا
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % images.length;
    setActiveIndex(nextIdx); // حدث الخلفية فورًا
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div
      className="absolute w-full mt-[105px] overflow-hidden"
    >
      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={700}
        onSwiper={(sw) => {
          swiperRef.current = sw;
        }}
        onSlideChange={(sw) => {
          // استخدم realIndex عشان اللوب
          setActiveIndex(sw.realIndex);
        }}
        className="w-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className=" w-full flex items-center justify-center">
              <img
                src={src}
                alt={`slide-${idx}`}
                className="shrink-0 w-full h-[250px]  lg:h-[700px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زرار الرجوع */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40
                   bg-black/90 text-[#D4AF37] w-9 h-9 rounded-full
                   flex items-center justify-center shadow-lg
                   hover:bg-amber-100 cursor-pointer transition"
        aria-label="previous"
      >
        ❮
      </button>

      {/* زرار التقدم */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40
                   bg-black/90 text-[#D4AF37] hover:bg-amber-100 cursor-pointer w-9 h-9 rounded-full
                   flex items-center justify-center shadow-lg
                    transition"
        aria-label="next"
      >
        ❯
      </button>
      <div className="absolute inset-0 bg-black/30 z-30"></div>
    </div>
  
  );
}
export default Sliderimg;