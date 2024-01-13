"use client"
// import { delete_a_product } from '@/actions/products/product'
import React from 'react'
import useSWR from 'swr'
export default function DeleteProduct({slug_id}:{slug_id:string}) {
  //const { data, error, isLoading } = useSWR('/api/Admin/product/delete-product', delete_a_product)

  return (

         <button type="submit" className="text-red-600 mx-2" onClick={
          async ()=>{
            // await delete_a_product(slug_id)
           }}>
           Delete 
         </button>
  
  )
}
