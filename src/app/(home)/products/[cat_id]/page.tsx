"use client"
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export interface producttype{
_id:string,
productName:string,
productDescription:string,
productImage:string,
productPrice:number,
productQuantity:number,
mesurType:string,

}


export default function CataProducts({ params }: { params: { cat_id: string } }) {
 
  const [products , setProduct] = useState([]);
  const [categories , setCategory] = useState([]);
  useEffect(()=>{
    get_products_by_cat()
    get_sub_categories()
  },[])


  async function get_products_by_cat(){
    const res = await fetch("/api/common/products/by_cat?id="+params.cat_id);
    const data = await res.json();
    if(data.success===false){
      toast.error(data.message)
    }else{
      setProduct(data.data)
    }
  }

  async function get_sub_categories(){
    const res = await fetch("/api/common/categories/sub_categories?id="+params.cat_id);
    const data = await res.json();
    if(data.success===false){
      toast.error(data.message)
    }else{
      setCategory(data.data)
    }
  }
  return (
    <div className=' w-full h-auto pt-24  bg-gradient-to-r from-[#30608D] via-black to-[#0A1915] pb-16 ' >
     <div className='  justify-center items-center'>
        <div className=' p-2 m-2  leading-[50px]'>
        {categories.map((cat:any)=>{  
         return(
         <Link key={cat._id} href={"/products/"+cat.categories._id} className='mx-3  my-3 h-10 p-2 bg-white rounded'>
          <div className='inline w-auto'>
            <div className='inline w-[20px] mr-2'> 
             <Image className='inline' src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+cat.categories.categoryImage} width={20} height={20} alt="C"/>
            </div>
            <div className='inline'>
              {cat.categories.categoryName}
            </div>
          </div>
         
          </Link>)
        })}
        </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 '>
   {products.map((item:producttype)=>{
    return(<ProductCard 
        productName = {item?.productName}
        productPrice = {item?.productPrice}
        productImage = {item?.productImage}
        productQuantity={item?.productQuantity}
        mesurType={item?.mesurType}
        productDescription= {item?.productDescription}
        id={item?._id}
        key={item?._id}/>)
   })}
       
      </div>
     </div>
   </div>
  )
}
