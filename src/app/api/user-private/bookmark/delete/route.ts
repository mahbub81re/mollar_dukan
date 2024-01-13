// create_a_category
// http://localhost:3000/api/user-private/bookmark/delete?id=

import connectDB from "@/lib/db";
import Bookmark from "@/models/Bookmark";
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
            const res =  await Bookmark.findByIdAndDelete(id);
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,data:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,data:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,data:err})
    }
}