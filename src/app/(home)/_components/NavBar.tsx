"use client"
import Logo from '@/components/Logo'
import React from 'react'
import NavLinks from './NavLinks'
import RightNav from './login_or_logout'
import { Toaster } from 'sonner';


export default function NavBar() {

  
  return (
    <>
    <div className="w-full  flex flex-row bg-white  justify-between items-center absolute top-0 shadow-md  border-b pb-2 font-serif z-[9999]">
        <div className=' flex flex-row justify-between items-center max-md:w-[70px] w-[250px]'>
          <Logo/>
        </div>
        <div className='w-full pl-12 max-md:pl-1 mt-2 flex justify-end'>
          <NavLinks/>
          <RightNav/>
        </div>
        
    </div>
    <Toaster />
    </>
  )
}
