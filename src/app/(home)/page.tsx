"use client"
import { useSession } from "next-auth/react"
import AllCatagories from "./_components/AllCatagories"
import Benner from "./_components/Benner"
import Bookmarked from "./_components/BookMarked"
import HelpLine from "./_components/HelpLine"
import HomeProducts from "./_components/HomeProducts"


export default function Home() {
  const {data:session} = useSession()
  return (
    <>
   <div className="w-full flex flex-col items-center mt-[60px]">
       <Benner/> 
     <AllCatagories/>
     {session&& <Bookmarked/>}
     <HomeProducts/>
     <HelpLine/>
   </div>
   </>
  )
}