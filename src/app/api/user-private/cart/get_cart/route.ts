//http://localhost:3000/api/user-private/cart/get_cart
import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    console.log(token)
    if(token){
      try{ 
        connectDB()

        const res = await Cart.find({userID:token?.id}).populate("productID");
         if(res){
           return NextResponse.json({success:true,data:res})
         }else{
            return NextResponse.json({success:false,message:"Not Found"})
         }
        }catch(err){
            return NextResponse.json({success:false,message:"Something is wrong!"})

        }
    }else{
      return NextResponse.json({success:false,message:"You are not authorized"})
    }
}