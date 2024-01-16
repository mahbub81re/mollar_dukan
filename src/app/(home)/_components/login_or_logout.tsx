"use client";

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useEffect from 'react';
import { toast } from 'react-toastify';


export default function RightNav() {
  const router = useRouter()
const {data:session} =useSession()

if(session){
  return (
    <div className='mr-4 mt-[2px]'>
       <Link href="/profile" className='max-md:hidden'>আপনি</Link>
       <Link href="/profile" className='md:hidden'><UserRound/></Link>
       
    </div>
  )
}
    return (
      <div className='mr-4 mt-[2px]'>
        <Button><Link href="/sign-in">Login</Link></Button>
      </div>
    )
  

  
}
