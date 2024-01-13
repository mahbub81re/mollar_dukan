//http://localhost:3000/api/user-private/cart/get_cart
import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(token){
      try{ 
        connectDB()
        const res = await Cart.find({userID:token?.id}).populate("productID");
         if(res){
           return NextResponse.json({success:true,data:res})
         }else{
            return NextResponse.json({success:false,message:"Somethis is heppend 1"})
         }
        }catch(err){
            return NextResponse.json({success:false,message:"Somethis is heppend"})

        }
    }
}