/// get_all_categories
//"http://localhost:3000/api/common/categories"

import connectDB from "@/lib/db";
import Category from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
      connectDB() 
      const  categories =await Category.find({categorySlug:"main"});
       if(categories){
        return  NextResponse.json({success:true, status:200, data:categories})
       }else{
        return NextResponse.json({success:false, status:401,message:"No Category founded"})
       }
    }catch(err){
        NextResponse.json({success:false, status:402,message:"Someting is wrong!"})
    }
}