"use client"
import Link from "next/link"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Catagories from "@/components/Catagories"
import { useSession } from "next-auth/react"
import NavCarts from "./NavCarts"
import { GanttChartSquare, Home, ShoppingCart } from "lucide-react"



export default function NavLinks() {

   const {data:session } = useSession()
 


  return (
    <NavigationMenu >
      <NavigationMenuList >
      <NavigationMenuItem className="mx-1">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="max-md:hidden">প্রথম পাতা</span>
              <span className="md:hidden"><Home/></span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="max-md:hidden">সকল প্রকার</span>
              <span className="md:hidden"><GanttChartSquare/></span>
              </NavigationMenuTrigger>
          <NavigationMenuContent>
             <Catagories/>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {session && <NavigationMenuItem >
            <NavigationMenuTrigger>
            <span className="max-md:hidden">আপনার ব্যাগ</span>
              <span className="md:hidden"><ShoppingCart/></span>
              </NavigationMenuTrigger>
               <NavigationMenuContent className="max-md:left-[50px]" >
                <NavCarts/>
                  <div className="flex">
                    <Link className="w-full h-8  bg-green-600 rounded text-center text-white pt-1 m-3" href="/my_cart">Go to Details</Link> 
                  </div>
               </NavigationMenuContent>
             </NavigationMenuItem>
             }
      </NavigationMenuList>
    </NavigationMenu>
  )
}


