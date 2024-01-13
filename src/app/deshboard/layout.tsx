"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';
import {  useSession } from 'next-auth/react';

export default function DeshboardLayout({children}:{children:React.ReactNode}) {
  const {data:session} = useSession();
  const router = useRouter()
  if(session && session.user && session.user.email==="admin@gmail.com"){
  return (
    <div className='flex flex-col '>
        <div className='flex fixed z-50 gap-6 w-full pl-12 py-6 bg-green-500 text-white'>
          <Link href="/deshboard/">Users</Link>
          <Link href="/deshboard/orders">Orders</Link>
          <Link href="/deshboard/products">Products</Link>
      </div>  
      {children}
    </div>
  )}

  if(session && session.user && session.user.email!=="admin@gmail.com"){
    router.push("/")
  }
}
