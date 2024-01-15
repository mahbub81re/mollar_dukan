"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
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


export default function OneCart({ cart}: { cart:CartItem }) {
    const [adding, setAdding] = useState(false)
    const [deleting, setDeleting] = useState(false)

    
    async function add_to_cart(id:string) {
        setAdding(true);
      
          const res = await fetch("/api/user-private/cart/add_product",{
            body:JSON.stringify({productID:id }),
            method:"POST"
          })
          const data =await res.json();
          if(data.success===false){
            toast.error(data.message)
          }else{
            toast('Product added successfully');
            // getCart()
          }
          setAdding(false);
       }
      
      
        async function deleteCart(id:string){
          setDeleting(true)
          const res=await fetch("/api/user-private/cart/delete_from_cart?id="+id,{method:"POST",cache:"reload"});
          const data =await res.json();
          if(data.success===false){
            toast.error(data.message)
          }else{
            toast.success("Deleted Succesfully");
            // getCart()
          }
          setDeleting(false)
        }
  
  return (
    <div key={cart._id} className='flex flex-col my-2 bg-gradient-to-tr from-[#004AAD] to-[#CB6CE6] rounded-sm'>
              <div className='flex flex-row bg-white m-2'>
                <Image src={"https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/"+cart.productID.productImage} width={60} height={60} alt={cart.productID.productName}/>
                 <div >
                   <div className='text-[26px] mx-2 '>{cart.productID.productName}</div>
                   <div className=' line-clamp-1 mx-2 '>{cart.productID.productDescription}</div>
                 </div>
              </div>
              <div className='flex p-2 text-white'>
                 <div >
                    <b>মোট পরিমান:</b> {cart.productID.productQuantity*cart.quantity+""+cart.productID.mesurType +" "}  
                    <b>মোট দাম: </b>  {cart.productID.productPrice*cart.quantity+"TK "}
                 </div>
                 <div className='-mt-2'>
                  <Button className='h-8  ml-2 rounded-full text-green-400 border-green-400' variant="outline" onClick={()=>add_to_cart(cart.productID._id)}>{adding?"Adding":"Add+"}</Button>
                  <Button className='h-8 text-red-400 ' onClick={()=>deleteCart(cart._id)}>{deleting?"Deleting":"Delete"}</Button>
                 </div>
              </div>
              {/* <ToastContainer/> */}
         </div>
  )
}
