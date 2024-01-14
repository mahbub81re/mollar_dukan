// create_a_order
// http://localhost:3000/api/user-private/address/create_an_address

import connectDB from "@/lib/db";
import UserAdress from "@/models/UserAddress";
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
            const final =  {userID:token?.id,shippingAddress:{
                fullName: data.fullName,
                address:data.address,
                city:data.city,
                postalCode:data.postalCode,
                country:data.country,
                phone:data.phone,

            }}
            const res =  await UserAdress.create(final);
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,message:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,message:"Someting is Wrong!"})
    }
}





