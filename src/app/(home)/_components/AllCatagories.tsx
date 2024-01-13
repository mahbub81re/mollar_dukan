"use client"
import localFont from 'next/font/local'
import React, { useEffect, useState } from 'react'
import SecTitle from './SecTitle'
import { BellElectric, Book, Shirt, Syringe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default  function AllCatagories() {
  const [catagories, setCat]= useState([])
  useEffect(()=>{
     getCatagoy()
  },[])
  let count=0;
  async function getCatagoy(){
      const res =await fetch("/api/common/categories",{cache:"reload"});
      const data = await res.json();
      setCat(data.data)
  }
  return (
    <div className=' w-full h-auto pb-24 bg-local ' style={{backgroundImage: `url("/catbg.png")`}}>
     <SecTitle dot_color="bg-[#ff3131]" title="Catagories" text_color="text-[#ff3131]"/>
      {/* cata list */}
      <div className="flex flex-row justify-center ">
        <div className={`grid grid-cols-1 md:grid-cols-2 text-[24px]  space-y-14  md:space-x-6 max-md:space-y-16 ` }>
          {catagories.map((category:any)=>{
            count+=1;
                 return(
                 <Link href={"/products/"+category._id} key={category._id} className={`${count===1&& "mt-14 ml-14"}`}>
                 <div className={`inline w-auto p-6 pr-8  rounded-full  bg-gradient-to-tr from-[#004AAD] to-[#CB6CE6]  md:my-4`}>
                   <div className='inline w-[40px] mr-2 rounded-full overflow-hidden'> 
                    <Image className="rounded-full inline w-[40px] h-[40px]"  src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+category.categoryImage} width={40} height={40} alt="C"/>
                   </div>
                  <div className='inline text-white text-[30px]  ml-2 '>
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
