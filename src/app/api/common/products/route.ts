// get_all_products
// http://localhost:3000/api/common/products?limit=1
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic'

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    
   try{
    connectDB();
    let defu = 0;
    if(limit){
        defu=parseInt(limit);;
    }
    const products =await Product.find().limit(defu);
    if(products){
        if(products.length < defu ){
            return NextResponse.json({status:200, success  :false , message :"No more products found"});
        }else{
            return NextResponse.json({status:200, success  :true ,  data: products });
        }
    }else{
        return NextResponse.json({status: 204 , success: false, message: 'No product found.' });
    }
   }catch(error){
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
   }
    
}

