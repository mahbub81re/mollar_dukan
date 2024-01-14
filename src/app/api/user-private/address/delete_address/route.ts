//  update_a_category
// http://localhost:3000/api/user-private/address/delete_address

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import UserAdress from "@/models/UserAddress";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });

    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
        if(!token){
            connectDB();
            const isUsed =  await Order.find({shippingAddress:id})
            if(isUsed.length>0){
                return NextResponse.json({success:true,status:200,data:"Sorry! you can not delete this at now, It have used for current Order "})
            }
            const res =  await UserAdress.findByIdAndDelete({_id:id});
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not Found Address"})
            }
        }else{
            return NextResponse.json({success:false,status:403,message:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,message:"Something is wrong"})
    }
}