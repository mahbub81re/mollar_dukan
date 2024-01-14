// create_a_order
// http://localhost:3000/api/user-private/order/create_order

import connectDB from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
        if(token){
            connectDB();
            const data = await req.json();
            const final = {
                user:token?.id,
                orderItems:data.orderItems,
                shippingAddress:data.shippingAddress,
                itemsPrice:data.itemsPrice,
                shippingPrice:data.shippingPrice,
                taxPrice:data.taxPrice,
                totalPrice:data.totalPrice
            }
            const res =  await Order.create(final);
            if(res){
                const delete_cart = await Cart.deleteMany({userID:final.user});
                if(delete_cart) console.log("deleted cart")
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,message:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,message:"Something is wrong!"})
    }
}





