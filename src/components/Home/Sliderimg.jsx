import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";            
import "swiper/css/autoplay";   

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img4.jpeg";
import img3 from "../../assets/images/back-startpage.jpeg";

function Sliderimg() {
  const images = [img1, img2, img3];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // const handlePrev = () => {
  //   const nextIdx = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
  //   setActiveIndex(nextIdx);
  //   if (swiperRef.current) {
  //     swiperRef.current.slidePrev();
  //   }
  // };

  // const handleNext = () => {
  //   const nextIdx = (activeIndex + 1) % images.length;
  //   setActiveIndex(nextIdx);
  //   if (swiperRef.current) {
  //     swiperRef.current.slideNext();
  //   }
  // };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false,
        }}
        speed={900} 
        onSwiper={(sw) => {
          swiperRef.current = sw;
        }}
        onSlideChange={(sw) => {
          setActiveIndex(sw.realIndex);
        }}
        className="w-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="w-full">
            {/* التعديل السحري: جعلنا الحاوية relative ووضعنا التظليل الأسود بداخلها مباشرة ليلتزم بطول الصورة بالملي */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src={src}
                alt={`slide-${idx}`}
                className="w-full h-[50vh] md:h-[85vh] lg:h-screen object-cover shrink-0 select-none pointer-events-none"
              />
              {/* التظليل الأسود أصبح داخل كل شريحة ليغطي الصورة فقط ولا يزيد عنها نهائياً */}
              <div className="absolute inset-0 bg-black/40 z-45 pointer-events-none"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* زر السهم الأيسر */}
      {/* <button
        onClick={handlePrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-45
                   bg-black/70 hover:bg-black/90 text-[#D4AF37] w-10 h-10 md:w-12 md:h-12 rounded-full
                   flex items-center justify-center shadow-2xl backdrop-blur-sm
                   cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 border-none outline-none font-bold text-sm md:text-lg"
        aria-label="previous"
      >
        ❮
      </button> */}

      {/* زر السهم الأيمن */}
      {/* <button
        onClick={handleNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-45
                   bg-black/70 hover:bg-black/90 text-[#D4AF37] w-10 h-10 md:w-12 md:h-12 rounded-full
                   flex items-center justify-center shadow-2xl backdrop-blur-sm
                   cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 border-none outline-none font-bold text-sm md:text-lg"
        aria-label="next"
      >
        ❯
      </button> */}
    </div>
  );
}

export default Sliderimg;
