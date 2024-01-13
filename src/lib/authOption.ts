import User from "@/models/User";
import { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "./db";
import bycrptjs from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions = {

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
              name: "credentials",
              credentials: {
                email: { },
                password: { }
              },
              async authorize(credentials , req) { 
                const  password = credentials?.password;
                const  email = credentials?.email;
                 console.log(credentials)
                
                try {
                  await connectDB();
                  const user = await User.findOne({ email });
              
                  if (!user) {
                    return null;
                  }
              
                  const passwordsMatch = await bycrptjs.compare(password || "", user.password);
              
                  if (!passwordsMatch) {
                    return null;
                  }
              
                  return { id: user._id, email: user.email, name: user.name, role: user.role };
                } catch (error) {
                  console.log("Error:", error);
                  // Handle the error appropriately, you may want to return null or throw an error
                  return null;
                }
              }
            
            }),
    ],

    callbacks: {
      async signIn({ user, account }: { user: any; account: any }) {
        if (account.provider === "google") {
          try {
            const { name, email  } = user;
            await connectDB();
            const ifUserExists = await User.findOne({ email });
            if (ifUserExists) {
              return user;
            }
            const newUser = new User({
              name: name,
              email: email,
              role:"user",
            });
            const res = await newUser.save();
            if (res.status === 200 || res.status === 201) {
              return {id:user._id,email:user.email,name:user.name,role:user.role};
            }
  
          } catch (err) {
            console.log(err);
          }
        }
        return {id:user._id,email:user.email,name:user.name,role:user.role};
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.role = token?.role || "user" ;
        }
        return token;
      },
  
      async session({ session, token }: { session: any; token: any }) {
        if (session.user) {
          session.user.id=token.id;
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.role = token.role;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
     signIn: "/",
   },
  }


