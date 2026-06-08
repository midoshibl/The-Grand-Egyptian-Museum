import { Flag , Check, Clock9, MapPin, NotepadText, SwitchCamera } from 'lucide-react';
function Ticket() {
    const items=[
        {
            person:"طالب مصري",
            price:"100 جنيه",
            Nationality:"للمواطنين المصريين",  
            color:"#1EB857"          
        },
        {
            person:"مصري بالغ",
            price:"200 جنيه",
            Nationality:"للمواطنين المصريين", 
            color:"#1EB857"          
        },
        {
            person:"مصري فوق 60 عام",
            price:"100 جنيه",
            Nationality:"للمواطنين المصريين",  
            color:"#1EB857"
        },
        {
            person:"عربي او اجنبي بالغ",
            price:"1450 جنيه",
            Nationality:"للزوار العرب والاجانب", 
            color:"#8B6F47"
        },
        {
            person:"عربي او اجنبي طالب",
            price:"730 جنيه",
            Nationality:"للزوار العرب والاجانب",
            color:"#8B6F47"
        },
        {
            person:"عربي او اجنبي بالغ مقيم",
            price:"730 جنيه",
            Nationality:"للمقيم عرب واجانب",
            color:"#D97706"
        },
        {
            person:"عربي او اجنبي طالب مقيم",
            price:"370 جنيه",
            Nationality:"للمقيم عرب واجانب",
            color:'#D97706'
        }
    ]
    const times=[
        {
            i:<Clock9 />,
            title:"مواعيد العمل",
            dis:"يوميًا من 9:00 صباحًا إلى 5:00 مساءً"
        },
        {
            i:<NotepadText />,
            title:"متطلبات الدخول",
            dis:"يجب إحضار بطاقة الهوية أو جواز السفر",
        },
        {
            i:<MapPin /> ,
            title:"الموقع",
            dis:"ميدان التحرير، القاهرة، مصر"
        },
        {
            i:<SwitchCamera />,
            title:"التصوير",
            dis:"مسموح التصوير في معظم القاعات (رسوم إضافية)"
        }
    ]
  return (
    <main className='bg-[#dbe4ed] mt-[105px] pb-4'>
        <section className=" container text-center pt-5">
            <h2 className="mb-7 text-5xl text-[#111827]">حجز التذاكر</h2>
            <p className="text-[#4B5563]">اختر نوع التذكرة المناسبة لك واستمتع بتجربة فريدة في استكشاف كنوز مصر القديمة</p>
        </section>
        <section className='container flex flex-wrap justify-center gap-7 py-10 my-6 ' dir='rtl'>
            {items.map((item) => (
                <div key={item} className='bg-[#E5E7EB] text-center w-[344px] mt-5 h-[458px] rounded-2xl shadow-lg' >
                    <div className="flex flex-col justify-center items-center h-[120px] rounded-t-2xl text-[#E5E7EB] " style={{ background: item.color }}>
                        <i className=''><Flag size={30} /></i>
                        <h1 className='text-[24px]' >{item.person}</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center'>
                            <h2 className="text-[36px] mb-3.5 " style={{ color: item.color }}>{item.price}</h2>
                            <p className='text-[16px] text-[#4B5563]'>{item.Nationality}</p>
                        </div>
                        <ul className='text-[16px] text-[#4B5563] w-[280px] space-y-2 my-10' dir=''>
                            <li className='flex items-center gap-2.5' dir='rtl'><span><Check color='#1EB857' /></span>دخول جميع القاعات</li>
                            <li className='flex items-center gap-2.5' dir='rtl'><span><Check color='#1EB857'/></span>جولة إرشادية مجانية</li>
                            <li className='flex items-center gap-2.5' dir='rtl'><span><Check color='#1EB857'/></span>خصم على المتجر</li>
                        </ul>
                        <a href="/loginPage" className=" w-[280px] py-2.5 cursor-pointer hover:scale-90 duration-200  rounded-2xl text-[#FFFFFF] " style={{ background: item.color }}>اشتري الأن</a>
                    </div>

                </div>

            ))
            }
        </section>
        <section className='my-13 w-[1104px] m-auto bg-[#FFFFFF] shadow px-4 rounded-2xl' dir='rtl'>
            <h2 className='text-[24px] text-[#111827] text-center font-bold'>معلومات مهمة</h2>
            <div className='grid grid-cols-2 py-4 gap-5'>
                {times.map((time) => (
                    <div key={time} className=' w-[502px] flex gap-2'>
                        <span className='text-[#D97706]'>{time.i}</span>
                        <div>
                            <h2 className='text-[16px] font-medium text-[#111827]'>{time.title}</h2>
                            <p className='text-[16px] text-[#4B5563]'> {time.dis}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </main>
  )
}

export default Ticket;