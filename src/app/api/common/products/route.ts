// get_all_products
// http://localhost:3000/api/common/products?limit=1
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export const dynamic = 'force-dynamic'

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    
   try{
    connectDB();
    let defu = 10;
    if(limit){
        defu=parseInt(limit);;
    }
    const products =await Product.find().limit(defu);
    if(products){
        return NextResponse.json({status:200, success  :true , data :products});
    }else{
        return NextResponse.json({status: 204 , success: false, message: 'No product found.' });
    }
   }catch(error){
    console.log('Error in getting all categories:', error);
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
   }
    
}

