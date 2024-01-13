import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === "/" || path === "/sign-up" || path==="/profile" || path==="/sign-in";

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  // const deshpath = path === "/api/admin/*" 
  // if(deshpath && token?.email!=="mollahmdmahbub@gmail.com"){
  //   return NextResponse.json("This request is not permited");
  // }
  
}

export const config = {
  matcher: ["/", "/sign-up"],
};