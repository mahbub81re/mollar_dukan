"use client"


import AllCatagories from "./_components/AllCatagories"
import Benner from "./_components/Benner"
import HomeProducts from "./_components/HomeProducts"


export default function Home() {
  return (
   <div className="w-full flex flex-col items-center mt-[60px]">
     {/* <Benner/> */}
     <AllCatagories/>
     <HomeProducts/>
   
   </div>
  )
}



    {/* <Image src="https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/Laptop-computer.webp" width={100} height={100} alt="iamge"/> */}
