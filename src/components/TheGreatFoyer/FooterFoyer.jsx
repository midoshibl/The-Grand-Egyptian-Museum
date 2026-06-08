import img1 from "../../assets/images/ramses.png"
import img2 from "../../assets/images/mernaptah.png"
import img3 from "../../assets/images/ptlme.png"
import img4 from "../../assets/images/ptlmya.png"
import { ChevronLeft } from 'lucide-react';

function FooterFoyer() {
    const items=[
        {
            imges:img1,
            title:"تمثال حجري ضخم للملك رمسيس الثاني"
        },
        {
            imges:img2,
            title:"عمود الملك مرنبتاح"
        },
        {
            imges:img3,
            title:"تمثال الملك بطلمي"
        },
        {
            imges:img4,
            title:"تمثال الملكة بطلمية"
        }
    ]
  return (
    <section dir="rtl" className=" mt-11 mb-16 font-cairo">
        <div className="flex justify-between">
            <div className="flex px-5">
            
            </div>
            <button><a className="flex font-medium" href="">المزيد<ChevronLeft className=" w-4 ml-5" /> </a></button>
        </div>
        <div className="flex mx-4 my-5 pb-15">
            {items.map((item) => (
                <div key={item} className="bg-[#4B5563] mx-4 ">
                    <div className="overflow-hidden">
                        <img src={item.imges} alt="" className="transition-all ease-in-out duration-500 hover:scale-105 " />
                    </div>
                    <h2 className="p-2.5 text-[#D1D5DB] ">{item.title}</h2>
                </div>
                )
            )}
        </div>
    </section>
  )
}

export default FooterFoyer;