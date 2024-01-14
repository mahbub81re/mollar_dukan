// get_products_by_cat
// "http://localhost:3000/api/common/admin/users"
import connectDB from "@/lib/db";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req:NextRequest) {

   try{
    connectDB();
    const product =await User.find().select("id name email role");
    if(product){
        return NextResponse.json({status:200, success  :true , data :product});
    }else{
        return NextResponse.json({status: 204 , success: false, message: 'No product found.' });
    }
   }catch(error){
    return NextResponse.json({status : 500 , success: false, message: "Something is wrong!" });
   }
    
}



export async function PUT(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });
    const data =await req.json();
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(token?.email===process.env.ADMIN){
        try{
        connectDB();
        const user =await User.findByIdAndUpdate(id,{role:data.role});
        if(user){
            return NextResponse.json({status:200, success  :true , data :user});
        }else{
            return NextResponse.json({status: 204 , success: false, message: 'No product found.' });
        }
       }catch(error){
        return NextResponse.json({status : 500 , success: false, message: "Something is wrong!" });
       }
    }else{
        return NextResponse.json({status : 500 , success: false, message: "Warning!" });
    }
}