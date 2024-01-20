"use client"
import localFont from 'next/font/local'
import React, { useEffect, useState } from 'react'
import SecTitle from './SecTitle'
import { BellElectric, Book, Shirt, Syringe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'


export default  function AllCatagories() {
  const [catagories, setCat]= useState([])
  useEffect(()=>{
     getCatagoy()
  },[])
  let count=0;
  async function getCatagoy(){
      const res =await fetch("/api/common/categories",{cache:"reload"});
      const data = await res.json();
      if(data.success===false){
       toast.error("Network Problem! please reload the page or check your connection");
      }else{
        setCat(data.data)
      }
  }
  return (
    <div className=' w-full h-auto pb-24 bg-white ' >
      {/* <ToastContainer/> */}
      <div className='flex flex-row justify-center items-center py-16'>
    <div className={`text-[40px]  text-pink-500 font-bold`}>
        পন্যের মূল প্রকার
     <div className='w-[300px] h-[6px]  mt-[4px] flex'>
         <div className={cn(`w-[260px] h-[3px] bg-pink-500 `)}></div>
         <div className={cn(`w-[8px] h-[3px] ml-[4px] opacity-75 bg-pink-500 `)}></div>
         <div className={cn(`w-[8px] h-[3px] ml-[4px] opacity-50 bg-pink-500` )}></div>
         <div className={cn(`w-[8px] h-[3px] ml-[4px] opacity-25 bg-pink-500`)}></div>
         <div className={cn(`w-[8px] h-[3px] ml-[4px] opacity-5 bg-pink-500`)}></div>
       </div>
      </div>
     
   </div>
      {/* cata list */}
      <div className="flex flex-row justify-center ">
        <div className={`grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-cols-6 text-[24px]     ` }>
          {catagories.map((category:any)=>{
            count+=1;
                 return(
                 <Link href={"/products/"+category._id} key={category._id} className={`${count===1&& " md:mt-14 md:ml-2   inline-block"}`}>
                 <div className={`inline-block  w-[150px]  bg-F3E4BA shadow-top-white shadow-bottom-594242 slider-title-bg-40000000 p-2 rounded-md h-[150px] drop-shadow-md items-center bg-white m-3 `}>
                   <div className='mr-2 rounded-full  w-full h-[60px]'> 
                    <Image className="rounded-full mx-auto  w-[60px] h-[60px]"  src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+category.categoryImage} width={60} height={60} alt="C"/>
                   </div>
                  <div className=' text-[20px] pt-4 ml-2 text-center'>
                     {category.categoryName}
                  </div>
                </div>
                  </Link>
               )
          })

          }
          

        </div>
      </div>
    </div>
  )
}


{/* <SecTitle dot_color="bg-pink-700"  text_color="text-pink-700"/> */}
