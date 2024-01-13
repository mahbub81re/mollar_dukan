
//  update_a_category
// http://localhost:3000/api/admin/products/create

import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const data =await req.json();
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
        if(token?.email==="admin@gmail.com"){
            connectDB();
            // Unfinished work

            const res =  await Product.create(data);
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,data:"Did not Found Order"})
            }
        }else{
            return NextResponse.json({success:false,status:403,data:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,data:err})
    }
}