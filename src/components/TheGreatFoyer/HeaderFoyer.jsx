import imgFoyer from "../../assets/images/TheGreatFoyer.jpg"
import { House ,ChevronLeft } from 'lucide-react';

function HeaderFoyer() {
  return (
    <div
      dir="rtl"
      className="relative mt-[130px] bg-cover transition-all duration-500 bg-position-[90%_center]
    md:bg-position-[90%_center] h-[600px] max-w-full lg:h-[800px]"
      style={{ backgroundImage: `url(${imgFoyer})` }}
    >
      <div className="container m-auto font-cairo h-44 pt-10">
        <div className="flex text-white mb-5">
          <a href="/home">
            <House />
          </a>
          <ChevronLeft className=" w-4  mx-2.5" />
          <h2 className="font-normal">البهو العظيم</h2>
        </div>
        <p className="font-bold  lg:text-5xl text-3xl text-white">البهو العظيم</p>
        <p className=" py-1.5 absolute bottom-7  px-30 border-b border-b-gray-900 font-medium text-2xl text-white">
        <h2 className="border-b w-fit bottom-0 pb-2.5 right-0 absolute">
          البهو العظيم
        </h2>
      </p>
      </div>

    </div>
  );
}

export default HeaderFoyer;
