"use client"
import AllCatagories from "./_components/AllCatagories"
import Benner from "./_components/Benner"
import HomeProducts from "./_components/HomeProducts"


export default function page() {
  return (
   <div className="w-full flex flex-col items-center mt-[60px]">
       <Benner/> 
     <AllCatagories/>
     <HomeProducts/>
   </div>
  )
}