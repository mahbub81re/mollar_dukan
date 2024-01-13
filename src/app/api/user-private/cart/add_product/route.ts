// create_a_order
// http://localhost:3000/api/user-private/cart/add_product

import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    // console.log(token)
    try{
        if(token){
            connectDB();
            const data = await req.json();
            const final =  {
                userID:data.userID,
                productID:data.productID,
                quantity:1
            }
            let res = null
            const isCart =  await Cart.findOne({userID:data.userID,productID:data.productID});
            
            if(isCart){
                const cartId = isCart._id;
                const q=1+isCart.quantity
                 res =  await Cart.findByIdAndUpdate({_id:cartId},{quantity: q});
            }else{
                 res =  await Cart.create(final);
            } 
           
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,data:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,data:"Not Authorized"})
        }
    } catch(err){
        return NextResponse.json({success:false,status:402,data:err})
    }
}




