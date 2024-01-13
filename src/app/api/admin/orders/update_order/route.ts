//  update_a_category
// http://localhost:3000/api/admin/categories/update_category

import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const data =await req.json();
    
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide Order id.' });

    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
        if(token?.email==="admin@gmail.com"){
            connectDB();
            // Unfinished work
            const {categoryName,categoryDescription, categoryImage,categorySlug}=data
            const res =  await Order.findByIdAndUpdate({_id:id},{categoryName,categoryDescription,categoryImage,categorySlug});
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