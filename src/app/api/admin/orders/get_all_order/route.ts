//  get_all_orders
// http://localhost:3000/api/admin/orders/get_all_order


import Order from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    });

    if(token?.email==="admin@gmail.com"){
            try{
            const res =await Order.find({}).populate("orderItems.product").populate("user").populate("shippingAddress");
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:401,data:"Their is no product  found"})
            }
            }catch(err){
                console.log(err)
                return NextResponse.json({success:false,status:404,message:err})
            
            }
     }else{
        return NextResponse.json({success:false,status:404,message:"Not Authorized"})

     }

}