import { cn } from '@/lib/utils'

import React from 'react'

export default function SecTitle({dot_color, text_color , title}:{dot_color:string,text_color:string , title:string}) {
  return (
    <div className='flex flex-row justify-center items-center py-16'>
    <div className={cn(`text-[40px] ${text_color}`)}>
     {title} 
     <div className='w-[160px] h-[6px]  mt-[4px] flex'>
         <div className={cn(`w-[120px] h-[6px]  `,dot_color)}></div>
         <div className={cn(`w-[8px] h-[6px] ml-[4px] opacity-75 `,dot_color)}></div>
         <div className={cn(`w-[8px] h-[6px] ml-[4px] opacity-50`, dot_color)}></div>
         <div className={cn(`w-[8px] h-[6px] ml-[4px] opacity-25`,dot_color)}></div>
         <div className={cn(`w-[8px] h-[6px] ml-[4px] opacity-5`,dot_color)}></div>
       </div>
      </div>
     
   </div>
  )
}
