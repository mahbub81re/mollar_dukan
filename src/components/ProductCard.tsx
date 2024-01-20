"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner';
import { Star, StarOff } from 'lucide-react'
type ProductData = {
  productName: string,
  productImage: string,
  productPrice: number,
  productDescription: string,
  productQuantity:number,
  mesurType:string,
  id: string,
  isBookmark:boolean,
};

export default function ProductCard({isBookmark, productName,productDescription, productImage, productPrice,productQuantity,mesurType, id}:ProductData) {
  const { data: session, status } = useSession()
  const [adding, setAdding] = useState(false)
  const [book , setBook] = useState(isBookmark)
 async function add_to_cart() {
  setAdding(true);
   
    const res = await fetch("/api/user-private/cart/add_product",{
      body:JSON.stringify({productID:id}),
      method:"POST"
    })
    const data =await res.json();
    if(!data.success){
      toast(data.message)
    }else{
      toast("Product Added Successfully",{duration:1000});
       setAdding(false);
    }
 }


 async function  addBookMark(){
  const res  = await fetch("/api/user-private/bookmark/add",{method:"POST",body:JSON.stringify({productID:id})})
    const data = await res.json();
    if(data.success===true){
      setBook(true)
    }
 }


 
 async function  deleteBookMark(){
  const res  = await fetch("/api/user-private/bookmark/delete",{method:"POST",body:JSON.stringify({productID:id})})
    const data = await res.json();
    if(data.success===true){
      setBook(false)
    }
 }
 
  return (
   <Card  className="max-sm:w-[280px] w-[240px]  border-none p-0 bg-white bg-gradient-to-tr from-[#004AAD] to-[#CB6CE6]">
      <CardContent className=' relative'>
        {session && book ?
        <div className=' absolute right-0 p-3 text-green-500' >
          <Button onClick={deleteBookMark}>
        <Star size={30}/>
          </Button></div>:<div className=' absolute right-0 p-3 ' >
          <Button onClick={ addBookMark}>
             <Star size={30}/>
          </Button></div>
          }
      <Image src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+productImage } width={250} height={250} className='w-full rounded-md ' alt="product"/>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <div className='flex flex-row w-full leading-1 justify-between'>
           <div className='p-2 max-w-[180px] overflow-hidden line-clamp-1 font-bold text-white' >{productName}</div>
          {session && <Button variant="outline" className='rounded-full px-3 mt-1 py-1 text-green-500 border-green-500' onClick={()=>add_to_cart()}>{adding?"Adding..":"Add+"}</Button>} 
        </div>
        <div className=' line-clamp-auto leading-4'>
            <div className='text-sm py-1 text-gray-200'>Price: {productPrice}tk {" "+productQuantity+mesurType}
            {/* <del className='text-red-500'>100tk</del> */}
            </div>
           <Link href={"/product/"} className=' text-gray-300'>{productDescription}</Link> 
        </div>
      </CardFooter>
   </Card>
  )
}
