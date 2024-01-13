"use client"
import NavCart from '@/components/NavCart'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
interface CartItem {
  _id: string;
  quantity: number;
  productID: {
      productImage: string;
      productName: string;
      productPrice: number;
      _id: string;
      productQuantity: number;
      mesurType:string;
  };
}

interface User{
  name:string,
  email:string,
  _id:string,
}
export default function NavCarts() {
    const {data:session}= useSession()
    const [carts,setCarts] =  useState<CartItem[]>([])
    const [user,setUser]=useState<User>()
    useEffect(()=>{
        getCart()
       },[session?.user])
       

       async function getCart() {
        try {
            const res = await fetch(`/api/user-private/cart/get_cart`, {
                method: 'GET',
                cache: 'reload',
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch cart data: ${res.status}`);
            }
            const data = await res.json();
            setCarts(data.data);
        } catch (error) {
            console.error(error);
        }
    }
  return (
        <>
        {
        carts.map((cart:CartItem)=>{
         
          let info={
            c_id:cart._id,
            c_quantity:cart.quantity,
            P_image:cart.productID?.productImage,
            P_id:cart.productID?._id,
            p_name:cart.productID?.productName, 
            p_price:cart.productID?.productPrice,
            p_quantity:cart.productID?.productQuantity,
            p_mesurType:cart.productID?.mesurType,
          }
         return( <NavCart key={cart._id} info={info}/>)
        })
       } 
       </>
  )
}
