"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function NavCart({info}:{info:{
  c_id:string,
  c_quantity:number,
  P_id:string,
  P_image:string,
  p_name:string, 
  p_price:number,
  p_quantity:number,
  p_mesurType:string,
}}) {
   
  const { data: session, status } = useSession()
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(true)

    
  useEffect(()=>{
    setLoading(false);
  },[])

 async function add_to_cart() {
  setAdding(true);
  
    const res = await fetch("/api/user-private/cart/add_product",{
      body:JSON.stringify({productID:info.P_id}),
      method:"POST"
    })
    const data =await res.json();
    setAdding(false);
 }


  async function deleteCart(){
    const res=await fetch("/api/user-private/cart/delete_from_cart?id="+info.c_id,{method:"POST",cache:"reload"});
    const data =await res.json();
    console.log(data)
  }
 


  return (
    <div className='flex flex-cal px-6 py-2  font-normal border-t-2  bg-white'>
      <div className='w-[280px] h-auto flex flex-col'>
          <div className='flex flex-row w-full bg-white  py-3  h-[70px] rounded-md'>
             <Image src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+info.P_image} className='bg-indigo-500 w-[70px] ' width={70} height={70} alt="Product"/>
             <div className='pl-2 w-[210px]'>
                <h1 className='text-md  font-bold'>
                 {info.p_name}
                </h1>
                <p className='flex -mt-3'>
                  <Button variant="secondary" onClick={()=>add_to_cart()} >
                       <span className='mr-2'>{info.p_quantity*info.c_quantity}-{info.p_mesurType} {info.p_price*info.c_quantity}tk </span> <span className={`text-green-600 px-[7px] text-xl font-bold border-2 rounded-full border-indigo-500 ${adding && "bg-indigo-500"}`}>+</span> 
                  </Button>
                </p>
             </div>
             <div className='flex flex-row relative w-12 '>
               <Button variant="default" size="icon"  className='opacity-30 absolute top-0 right-0'> 
                    <X size={20} onClick={()=>deleteCart()}/>
               </Button>
             </div>
          </div>
          
      </div>
    </div>
  )
}
