import React from 'react'
import Logo from './Logo'
import { Mail, Phone } from 'lucide-react'
import { Form, FormField } from './ui/form'

export default function  Footer() {
  return (
    <div className='flex w-full bg-[#100960] p-12'>
      <div className='flex flex-row max-md:flex-col justify-between items-center gap-12'>
        <div >
            <div className='w-[200px] h-[180px] bg-white flex flex-col justify-center '>
                  <Logo/>
            </div>
        </div> 
        <div className='text-white'>
          <div className='text-2xl'>Md Mahbub Molla</div>
          <div className="pb-2">Owner of this site.</div>
          <div>যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ যেহেতু মানব পরিবারের সকল সদস্যের সমান ও অবিচ্ছেদ্য অধিকারসমূহ</div>
          <div className='mt-8'>
              <div className='flex mb-1'> <Phone className='mr-2 border-2 p-1 rounded-full'/> +8801234*****</div>
              <div className='flex'> <Mail className='mr-2 border-2 p-1 rounded-full'/> example@gmail.com</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
