"use client";

import { Mail, Lock, User, Phone } from "lucide-react";
import Image from "next/image";
import React, {  useState } from "react";
import axios from "axios";
import {  useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SignUpPage() {
    
   
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.name || !user.email || !user.password) {
        toast.error("please fill all the fields");
        return;
      }
      if (user.email.length!==11) {
        toast.error("invalid email id");
        return;
      }
      const res = await axios.post("/api/register", user);
  
      if (res.status == 200 || res.status == 201) {
        toast.success("user added successfully");
        const resLog = await signIn("credentials", {
          email: res.data.user.email,
          password: res.data.user.password,
          redirect: false,
        });
        if (resLog?.error) {
          toast.error("User doesn't loged-in")
        }
  
        toast.success("user Loged-in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something's going wrong!")
    } finally {
      setLoading(false);

      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url("/background.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <ToastContainer/> */}
      <div className="grid place-items-center mx-auto max-w-4xl w-full lg:py-10 min-h-screen ">
        <div className="flex justify-center items-center  lg:flex-row flex-col gap-6 lg:gap-0 w-full shadow-md rounded-2xl">
          <div className="lg:w-1/2 w-full bg-[#5D7DF3]  max-lg:bg-[#5D7DF3] max-lg:hidden">
            <Image
              src="/bg-2.png"
              alt="bg"
              className="w-full h-full"
              width={300}
              height={300}
            />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center py-6 bg-[#eff1f6]">
            <div className=" px-4 py-[6px] ">
             
            </div>
            <form
              className="w-full px-5 py-6 space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Fullname</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <User className="w-7 h-7 text-[#A1BDFD]" />
                  <input
                    type={"text"}
                    placeholder="John Doe"
                    name="name"
                    className="outline-none w-full px-4"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Phone</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <Phone className="w-7 h-7 text-[#A1BDFD]" />
                  <input
                    type={"text"}
                    placeholder="01*********"
                    name="email"
                    className="outline-none w-full px-4"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Password</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <Lock className="w-7 h-7 text-[#A1BDFD]" />
                  <input
                    type={"password"}
                    placeholder="**********"
                    name="password"
                    className="outline-none w-full px-4"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid place-items-center w-full mx-auto pt-7">
                  {error && <p className="py-6 text-lg">{error}</p>}
                  <button
                    type="submit"
                    className="bg-[#5D7DF3] text-white text-lg w-full px-8 py-3 rounded-md uppercase font-semibold"
                  >
                    {loading ? "Processing" : " Register"}
                  </button>
                </div>
                <div className="flex justify-center w-full items-center gap-3 py-3">
                  <div className="border-b border-gray-800 py-2 w-full px-6" />
                  <div className="mt-3">or</div>
                  <div className="border-b border-gray-800 py-2 w-full px-6" />
                </div>
                <div className="text-lg text-slate-900 font-medium">
                  <span>Have an account?</span>
                  <a href="/sign-in" className="text-[#5D7DF3] pl-3 hover:underline">
                    Login
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

