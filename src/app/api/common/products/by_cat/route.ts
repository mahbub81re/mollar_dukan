// get_products_by_cat
// "http://localhost:3000/api/common/products/by_cat?id=id"
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });

   try{
    connectDB();
    const products =await Product.find({
        productCategory:id
    }).select("productName productDescription productDescription productImage productPrice productQuantity ");
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




