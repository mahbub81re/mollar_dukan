"use client"
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
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
export default function MyCart() {
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(false)
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
       setAddress(data.data);
       if(data.data.length>0) setSelect(data.data[0]._id);

  } 

    
  async function getCart() {
         
            setUpdating(true);
            try {
                const res = await fetch(`/api/user-private/cart/get_cart`, {
                    method: 'GET',
                    cache: 'reload',
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch cart data: ${res.status}`);
                }
                const data = await res.json();
                console.log(data)
                setCarts(data.data);
                setUpdating(false);
                
            } catch (error) {
                console.error(error);
            }
           }
       
    


    async function add_to_cart(id:string) {
      setAdding(true);
    
        const res = await fetch("/api/user-private/cart/add_product",{
          body:JSON.stringify({productID:id }),
          method:"POST"
        })
        const data =await res.json();
        getCart()
        setAdding(false);
     }
    
    
      async function deleteCart(id:string){
        setDeleting(true)
        const res=await fetch("/api/user-private/cart/delete_from_cart?id="+id,{method:"POST",cache:"reload"});
        const data =await res.json();
        getCart()
        setDeleting(false)
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
                  console.log(data)
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
         </div>
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
