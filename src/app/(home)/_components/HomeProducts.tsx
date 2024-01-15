import React, { useEffect, useState } from 'react'
import SecTitle from './SecTitle'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { toast } from 'sonner';


type ProductData = {
  _id: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productPrice: number,
  productQuantity: number,
  mesurType:string,

};

export default function HomeProducts() {
  const [products, setProducts] = useState <ProductData[] | []> ([]);
  useEffect(()=>{
        getProducts()
  },[])

  async function getProducts() {
     const res  = await fetch("/api/common/products?limit=10")
     const data = await res.json();
     if(data.success===false){
      toast.error("Network Problem! please reload the page or check your connection");
     }else{
       setProducts(data.data);
     }
  }
  return (
    <div className=' w-full h-auto   bg-gradient-to-r from-[#30608D] via-black to-[#0A1915] pb-16 ' >
      {/* <ToastContainer/> */}
    <SecTitle dot_color="bg-white" title="Products"  text_color="text-white"/>
     <div className='flex flex-row justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 '>
      {
        products.map((product:ProductData)=>
        <ProductCard 
        productName={product.productName}
        productQuantity={product.productQuantity}
        mesurType={product.mesurType}
        productImage={product.productImage}
        productPrice={product.productPrice}
        productDescription={product.productDescription}
        id={product._id}
        key={product._id}/>)
      }
        
      </div>
      
     </div>
     <Link href="/products" className='text-green-500 float-right mr-[100px]'>See More...</Link>
   </div>
  )
}
