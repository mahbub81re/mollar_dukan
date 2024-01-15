// create_a_order
// http://localhost:3000/api/user-private/message_admin
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    // console.log(token)
    try{
        if(token){
            connectDB();
            const res = await req.json();
            const final =  {
               message:res.message,
               userID:token.id,
            }
            const data =  await Contact.create(final);
            
        
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



export async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })

    try{
        if(token){
            connectDB();
            const data =  await Contact.find({userID:token.id}).limit(20);
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



