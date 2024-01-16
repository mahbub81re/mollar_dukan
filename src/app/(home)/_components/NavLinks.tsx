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
        {session && <NavigationMenuItem className="mx-1">
        <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <span className="max-md:hidden">আপনার ব্যাগ</span>
              <span className="md:hidden"><ShoppingCart/></span>
            </NavigationMenuLink>
          </Link>
          </NavigationMenuItem> }
          
      </NavigationMenuList>
    </NavigationMenu>
  )
}


