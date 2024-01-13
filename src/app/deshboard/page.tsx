"use client"
import Link from 'next/link'

import React, { useEffect } from 'react'

export default  function Deshboard() {

   
  
  // useEffect(()=>{
   
  //  if(session){
  //   if(session?.user?.email !=="mollahmahbub81@gmail.com"){
  //     router.push("/") 
  //     }
  //   }else{
  //     router.push("/") 
  //   }
    
  // },[])


    return (
          <div className='flex flex-col pt-24 pl-5'>
          <h1>Deshboard</h1>
          <div><Link href="/deshboard/users">Users</Link></div>
          <div><Link href="/deshboard/orders">Orders</Link></div>
          <div><Link href="/deshboard/products">Products</Link></div>
        </div>
       )
     
}
