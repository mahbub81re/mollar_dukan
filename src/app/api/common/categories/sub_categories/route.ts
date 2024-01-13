// get_products_by_cat
// "http://localhost:3000/api/common/cetagories/sub_cetagories?id=id"
import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });

   try{
    connectDB();
    const products =await Category.findById(id).populate("subcategories.categories");
    if(products.subcategories){
        return NextResponse.json({status:200, success  :true , data :products.subcategories});
    }else{
        return NextResponse.json({status: 204 , success: false, message: 'No product found.' });
    }
   }catch(error){
    console.log('Error in getting all categories:', error);
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
   }
    
}




