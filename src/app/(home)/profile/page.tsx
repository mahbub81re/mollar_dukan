"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Address {
    shippingAddress: {
        fullName:string,
        address:string,
        city: string,
        postalCode: number,
        country: string,
        phone:string,
    };
    _id:string;
}

interface shippingAddress{
    fullName:string;
    address:string;
    city: string;
    postalCode: number;
    country: string;
    phone:string;
    id:string;
   
}

export default function Profile() {
    const {data:session} = useSession();
    const [addresses, setAddresses] = useState<Address [] | []>([])
    useEffect(()=>{
      getAddress();
    },[session?.user])

    async function getAddress(){
        if(session?.user){
            const res =await fetch("/api/user-private/address/get_address")
            const data =await res.json();
            if(data.success===false){
                toast.error(data.message)
            }else{
                setAddresses(data.data)
            }  
        }  
    }

    if(!session?.user){
        return " ";
    }
  return (
    <div className='flex flex-col justify-center mt-20'>
         <div className='fixed -left-16 top-40 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed left-10 top-60 max-md:hidden rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed -right-16 top-40 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed right-64 max-md:hidden top-60 rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='fixed right-16 max-md:hidden top-10 rotate-45 w-[300px] h-[300px] -z-40 bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
        {/* User Model info */}
        <div className='mx-auto'>
           <h1>Your Name:{session?.user?.name} <button>Edit</button></h1>
           <p>Your email:{session?.user?.email}</p>
           <p>
            <Button onClick={()=>signOut()}>LogOut</Button>
           </p>
        </div>
         {/* Address Model info */}
         <div className='mx-auto'>
            {addresses.map((address:Address)=>{
              return (
                <div key={address._id}>
                    <AddressOne  
                    fullName={address.shippingAddress.fullName}
                    id={address._id}
                    address={address.shippingAddress.address}
                    city={address.shippingAddress.city}
                    postalCode={address.shippingAddress.postalCode}
                    phone={address.shippingAddress.phone}
                    country={address.shippingAddress.country}
                    
                     />
               </div>
              )
            })}
             <AddAnother />
         </div>
        
         {/* reword */}
    </div>
  )
}
type Inputs = {
    fullName: string;
    address:string;
    city:string;
    postalCode:number;
    country:string;
    phone:string;
    id:string;
}


function AddressOne({fullName,address,city,postalCode,country,phone,id}:shippingAddress){
    const [editable, setEditable] = useState(true)
     const router = useRouter()
    const { register, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });


    const onSubmit: SubmitHandler<Inputs> = async data => {
        console.log(data)
        const res =await fetch("/api/user-private/address/update_address?id="+id,{
            method:"POST",
            body:JSON.stringify(data),
        })
        const dat =await res.json()
        if(dat.success===false){
           toast.error(dat.message)
        }else{
          router.push("/profile")
        }
    }
   return (<>
    <form  onSubmit={handleSubmit(onSubmit)} className="w-full my-6 bg-orange-300 p-5 max-w-lg flex flex-col  py-2  ">
   <div className='flex flex-row justify-between border-b'> <label>FullName:</label> {editable?<div> {fullName} </div>:<input className='p-2 bg-slate-400' {...register("fullName", { required: true, value:fullName })} type='text' />}</div>
   <div className='flex flex-row justify-between border-b'> <label>Address:</label>{editable?<div> {address} </div>  :<input className='p-2 bg-slate-400' {...register("address", { required: true , value:address })} type='text' />}</div>
   <div className='flex flex-row justify-between border-b'> <label>City:</label> {editable?<div>  {city}  </div>:<input className='p-2 bg-slate-400' {...register("city", { required: true,value:city })}  type='text' />} </div>
   <div className='flex flex-row justify-between border-b'> <label>PostalCode:</label>{editable? <div> {postalCode} </div> :<input className='p-2 bg-slate-400' {...register("postalCode", { required: true , value:postalCode})}  type='number' />}</div>
   <div className='flex flex-row justify-between border-b'><label>Country:</label>{editable? <div> {country} </div> :<input className='p-2 bg-slate-400' {...register("country", { required: true , value:country})} type='text' />} </div>
   <div className='flex flex-row justify-between border-b'><label> Phone:</label> {editable?<div>  {phone}  </div>:<input  className='p-2 bg-slate-400' {...register("phone", { required: true,value:phone })} type='text' />}</div>
    {!editable &&   <Button  type="submit">Submit</Button>}
      <button type='button' onClick={()=>setEditable(!editable)} >{editable?"Edit":"Cancel"}</button>
    </form>
   
    </>
    )
}



function AddAnother(){
    const [editable, setEditable] = useState(false)
    const router = useRouter()
    const { register, handleSubmit } = useForm<Inputs>({
        criteriaMode: "all"
    });


    const onSubmit: SubmitHandler<Inputs> = async data => {
        console.log(data)
        const res =await fetch("/api/user-private/address/create_an_address",{
            method:"POST",
            body:JSON.stringify(data),
        })
        const dat =await res.json()
        if(dat.success===false){
            toast.error(dat.message)
         }else{
           router.push("/profile")
         }
    }
    return(
       
       
        <form  onSubmit={handleSubmit(onSubmit)} className="w-full my-6 bg-orange-300 p-5 max-w-lg flex flex-col  py-2  ">
         {editable && 
         <>
           <div className='flex flex-row justify-between border-b'> <label>FullName:</label> <input className='p-2 bg-slate-400' {...register("fullName", { required: true })} type='text' /></div>
           <div className='flex flex-row justify-between border-b'> <label>Address:</label><input className='p-2 bg-slate-400' {...register("address", { required: true })} type='text' /></div>
           <div className='flex flex-row justify-between border-b'> <label>City:</label> <input className='p-2 bg-slate-400' {...register("city", { required: true, value:"Daudkandi" })}  type='text' /> </div>
           <div className='flex flex-row justify-between border-b'> <label>PostalCode:</label> :<input className='p-2 bg-slate-400' {...register("postalCode", { required: true , value:1234 })}  type='number' /></div>
           <div className='flex flex-row justify-between border-b'><label>Country:</label><input className='p-2 bg-slate-400' {...register("country", { required: true, value:"Bangladesh" })} type='text' /> </div>
           <div className='flex flex-row justify-between border-b'><label> Phone:</label> <input  className='p-2 bg-slate-400' {...register("phone", { required: true})} type='text' /></div>
           <Button onClick={handleSubmit(onSubmit)}  type="submit">Submit</Button>
     </>}
        
        <button type='button' onClick={()=>setEditable(!editable)} >{editable?"Cancel":"Add One"}</button>
        </form>)



    
}