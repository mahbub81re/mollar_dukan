import React, { useEffect, useRef, useState } from 'react'
import SecTitle from './SecTitle'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';


type ProductData = {
  _id: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productPrice: number,
  productQuantity: number,
  mesurType:string,

};


type Bookmark ={
  productID:{
    _id: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productPrice: number,
  productQuantity: number,
  mesurType:string,
  }
  _id:string,
} 


export default function Bookmarked() {
  const {data:session} = useSession()
  const [boookmarks, setBookmark] = useState <Bookmark[] | []> ([]);
  const [loading,setLoading]= useState(false);



  useEffect(()=>{
      getBookmark()
  },[session])

  async function getBookmark(){
    setLoading(true)
    const res  = await fetch("/api/user-private/bookmark")
    const data = await res.json();
    if(data.success===true){
      setBookmark(data.data)
    }
    setLoading(false)

  }

if(session && boookmarks.length===0){
  return ""
}
  return (
    <div  className=' w-full h-auto   bg-gradient-to-r from-[#30608D] via-black to-[#0A1915] pb-16 ' >
    <SecTitle dot_color="bg-white" title="পছন্দের পন্য"  text_color="text-white"/>
     <div className='flex flex-row justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 '>
      {
        boookmarks.map((product:Bookmark)=>{
          let isbook = true;
          return(<ProductCard 
        isBookmark={isbook}
        productName={product.productID.productName}
        productQuantity={product.productID.productQuantity}
        mesurType={product.productID.mesurType}
        productImage={product.productID.productImage}
        productPrice={product.productID.productPrice}
        productDescription={product.productID.productDescription}
        id={product.productID._id}
        key={product._id}/>)
        }
        )
      }
        
      </div>
      
     </div>
     <div className='py-8 mb-[100px]'>
    {loading && "fetching.."}</div>
   </div>
  )
}
