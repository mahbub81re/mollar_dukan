"use client"
import React, { useEffect, useState } from 'react'
import CatCart from './CatCart'
import Link from 'next/link'
import { toast } from 'sonner';

export default function Catagories() {
  const [catagories, setCat]= useState([])

  useEffect(()=>{
     getCatagoy()
  },[])

  async function getCatagoy(){
      const res = await fetch("/api/common/categories",{cache:"reload"});
      const data = await res.json();
      if(data.success===false){
        toast.error(data.message)
     }else{
      setCat(data.data)
     }
  }
  return (
    <div className=' p-4 bg-white'>
      {
        catagories.map((cat:any)=>{
          return(
          <Link href={"/products/"+cat._id} key={cat._id} ><CatCart title={cat.categoryName} imagelink={cat.categoryImage}/> </Link>   
          )
        })
      }
    
    </div>
  )
}
