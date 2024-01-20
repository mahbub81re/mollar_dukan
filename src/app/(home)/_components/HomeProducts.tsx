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
} 


export default function HomeProducts() {
  const {data:session} = useSession()
  const [products, setProducts] = useState <ProductData[] | []> ([]);
  const [boookmarks, setBookmark] = useState <Bookmark[] | []> ([]);
  const [fetchingon, setFetching] = useState(true)
  const [loading,setLoading]= useState(false);

  useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        setFetching(true)
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  useEffect(()=>{
      if(fetchingon && products.length%10===0)  getProducts()
  },[fetchingon])


  useEffect(()=>{
      getBookmark()
  },[session])

  async function getBookmark(){
    const res  = await fetch("http://localhost:3000/api/user-private/bookmark")
    const data = await res.json();
    if(data.success===true){
      setBookmark(data.data)
    }
  }

  async function getProducts() {
    setLoading(true)
       const res  = await fetch("/api/common/products?limit="+products.length)
     const data = await res.json();
     if(data.success===false){
      setFetching(false)
      toast.error(data.message);
     }else{
      const fdata = data.data
      const cproducts = [...products, ...fdata];
        setProducts(cproducts)
        setFetching(false)
     }
     setLoading(false)
  }
  return (
    <div  className=' w-full h-auto   bg-gradient-to-r from-[#30608D] via-black to-[#0A1915] pb-16 ' >
      {/* <ToastContainer/> */}
    <SecTitle dot_color="bg-white" title="পন্য সমূহ"  text_color="text-white"/>
     <div className='flex flex-row justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 '>
      {
        products.map((product:ProductData)=>{
          let isbook = boookmarks.find(obj => obj.productID._id ===product._id)
          return(
                <ProductCard 
              isBookmark={isbook? true:false}
              productName={product.productName}
              productQuantity={product.productQuantity}
              mesurType={product.mesurType}
              productImage={product.productImage}
              productPrice={product.productPrice}
              productDescription={product.productDescription}
              id={product._id}
              key={product._id}/>
               )
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
