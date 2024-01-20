// create_a_category
// http://localhost:3000/api/user-private/bookmark/add

import connectDB from "@/lib/db";
import Bookmark from "@/models/Bookmark";
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
            console.log(data)
            const res =  await Bookmark.findOneAndDelete({userID:token.id,productID:data.productID});
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Not Added"})
            }
        }else{
            return NextResponse.json({success:false,status:403,message:"Not Authorized"})
        }
    }catch(err){
        return NextResponse.json({success:false,status:402,message:"Something is wrong!"})
    }
}