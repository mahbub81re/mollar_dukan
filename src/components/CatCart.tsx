import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CatProps {
    imagelink:string;
    title:string;
}
export default function CatCart({imagelink,title}:CatProps) {
  return (
      <div className='w-[200px] flex flex-row border rounded-md p-3 my-2'>
         <Image src={`https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/${imagelink}`} height={40} width={40} alt="electronics"/>
         <div className='pl-2'>{title}</div>
       </div>
  )
}
