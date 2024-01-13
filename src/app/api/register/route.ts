
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bycrptjs from "bcryptjs"
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const user = await User.findOne({ email });
    const salt = await bycrptjs.genSalt(10);
    const hashedPassword = await bycrptjs.hash(password, salt);

    if (user && user.password) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }else if(user){
      
    User.findOneAndUpdate({
        email:email
      },
       {password:hashedPassword}
      ).then((data)=>{
        return NextResponse.json({
          message: "User created successfully",
          success: true,
          data,
        });
      });
    }

    

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user:{email:email, password:password},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}