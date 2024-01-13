// create_a_category
// http://localhost:3000/api/admin/categories/create_category

import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('perent_id');
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
        if(token?.email==="admin@gmail.com"){
            connectDB();
            const data = await req.json();
            const res =  await Category.create(data);
            if(res){
                await Category.findByIdAndUpdate(id,{$push:{subcategories:{categories:res._id}}});
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,data:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,data:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,data:"Someting is wrong"})
    }
}