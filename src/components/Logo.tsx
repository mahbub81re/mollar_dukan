import Image from 'next/image'
import localFont from 'next/font/local'
import React from 'react'

import { cn } from '@/lib/utils'


const myFont = localFont({ src: './../fonts/Bukhari Script.ttf' })
export default function Logo() {
  return (
    <div className='flex flex-row w-[160px] max-md:w-auto justify-between ml-3 my-[2px]'>
      <div >
        <Image src="/Mollar Dukan.png" width={140} height={50} alt="E" className='max-md:hidden'/>
        <Image src="/MD.png" width={40} height={40} alt="E" className='md:hidden'/>
      </div>
    </div>
  )
}
