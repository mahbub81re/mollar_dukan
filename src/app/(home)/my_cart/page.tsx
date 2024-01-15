"use client"
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import OneCart from './_components/OneCart';
import { toast } from 'sonner';
interface CartItem {
  _id: string;
  quantity: number;
  productID: {
      productImage: string;
      productName: string;
      productPrice: number;
      productDescription:string;
      _id: string;
      productQuantity: number;
      mesurType:string;
  };
}

interface AddressType {
  shippingAddress: {
    fullName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string,
};
_id:string
}
export default function MyCartPage() {
  const [updating, setUpdating] = useState(false)
  const [select,setSelect] = useState("")
 const {data:session} = useSession();
 const [address , setAddress] = useState<AddressType[]>([])
 const [carts,setCarts] =  useState<CartItem[]>([])
 let tprice=0;
 useEffect(()=>{
    getAddress()
    getCart()
 },[session?.user])

  async function getAddress(){
      const res = await fetch("/api/user-private/address/get_address");
       const data = await res.json()
       if(data.success===false){
        toast.error("Network problem")
       }else{
        setAddress(data.data);
        if(data.data.length>0) {setSelect(data.data[0]._id);}
        else{
          toast.warning("Add An Address First!")
        }
       }
  } 

    
  async function getCart() {
         
            setUpdating(true);
            try {
                const res = await fetch(`/api/user-private/cart/get_cart`, {
                    method: 'GET',
                    cache: 'reload',
                });
                if (!res.ok) {
                  toast.error("Network problem")
                }

                const data = await res.json();
                if(data.success===false){
                  toast.error(data.message)
                }else{
                  setCarts(data.data);
                setUpdating(false);
                }  
            } catch (error) {
              toast.error("Something is wrong")
            }
           }
       
    



      async function order(){
        const final = {
                      orderItems:carts.map((cart)=>{ return {product:cart.productID._id,qty:cart.quantity}}) ,
                      shippingAddress :select,
                      itemsPrice : tprice,
                      taxPrice : 0,
                      shippingPrice : 0,
                      totalPrice : tprice
                  }
                  const res=await fetch("/api/user-private/order/create_order",{method:"POST",body:JSON.stringify(final)});
                  const data =await res.json();
                  if(data.success===false){
                    toast.error(data.message)
                  }else{
                    toast.success("Ordered Succesfully");
                    getCart()
                  }
      }

  return (
    <div className='flex flex-col  pt-16'>
      {/* some style */}
      <div className='fixed -left-16 top-40 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed left-10 top-60 max-md:hidden rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed -right-16 top-40 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed right-64 max-md:hidden top-60 rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed right-16 max-md:hidden top-10 rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='flex flex-row md:mx-28 max-sm:flex-col  justify-center'>
            <div className='p-4'>
            {updating ? "Updating. .." :"Products Cart"}
            <>
        {
        carts.map((cart:CartItem)=>{
          tprice = tprice +cart.quantity*cart.productID.productPrice
         return( 
         <OneCart cart={cart} key={cart._id}/>
         )
        })
       } 
       </>
            </div>
            <div className='p-4 bg-gradient-to-tr from-[#004AAD] to-[#CB6CE6] rounded-sm m-3'>
                <div className='bg-white p-2'>
                 <div className='font-bold'>
                    আপনার তথ্য
                 </div>
                 <div>
                  পন্যের দাম: {tprice}<br/>
                  পৌছানোর খরচ: 0<br/>
                 </div>
                 <h1 className='font-bold'>আপনার ঠিকানা</h1>
                 
                  <div>
                  <div className='flex flex-row'>
                    <select onChange={(e)=>setSelect(e.target.value)} value={select}>
                    {
                      address.map((add:any)=>{
                          return(<option key={add._id} value={add._id}>{add.shippingAddress.fullName }</option>
                         )
                      })
                     }
                    </select> 
                    <Link href="/profile" className='pl-2 text-green-400'>
                      আরেকটি যুক্ত করুন
                    </Link>
                    </div>
                   
                  </div>
                  </div>
              
               <Button variant="outline" className='m-2 bg-green-400'   onClick={()=>order()}>
                      ক্রয় করুন
               </Button>
           </div>
      </div>
    </div>
  )
}
