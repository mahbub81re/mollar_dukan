// http://localhost:3000/api/user-private/message_admin
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
 
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });

    try{
        if(token){
            connectDB();
            const data =  await Contact.find({userID:id});
            if(data){
                return NextResponse.json({success:true,status:200,data:data})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not created category"})
            }
        }else{
            return NextResponse.json({success:false,status:403,message:"Not Authorized"})
        }
    } catch(err){
        return NextResponse.json({success:false,status:402,message:"Something is wrong!"})
    }
}



