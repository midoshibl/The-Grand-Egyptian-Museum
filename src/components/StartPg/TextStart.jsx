import { ArrowBigLeftDash } from 'lucide-react';

function TextStart() {
  return (
        <div className=" m-auto text-[30px] min-[650px]:text-[55px] text-white h-fit z-40 max-w-full text-center font-bold">
            <p className="text-center  mb-13">
              مرحباً بكم في
              <br />
              <span>المتحف المصري الكبير </span>
            </p>
            <button className=" bg-amber-500  transition-all duration-400 text-3xl py-3 px-10  hover:scale-94 hover:bg-blue-600 rounded-3xl"><a className="flex items-center gap-7" href="/home">ابدأ <ArrowBigLeftDash /></a></button>
        </div>
  )
}

export default TextStart;