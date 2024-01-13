"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { X } from "lucide-react";
// import { Detail } from "../_components/Detail"
import { useEffect, useState } from "react"


interface shippingAddress{
  shippingAddress: {
      fullName:string;
      address:string;
      city: string;
      postalCode: number;
      country: string;
      phone:string;
  }
  _id:string;
 
}

 interface Address{
  fullName:string;
      address:string;
      city: string;
      postalCode: number;
      country: string;
      phone:string;
      _id:string;
 }
  interface User{
    name:string,
    email:string,
    role:string,
    _id:string,
  }
  export default function Users() {
    

    const [users,setUsers] = useState<User[] | []>([])
    const [change,setChange] = useState(false);
    const [currentRole,setRole] = useState("");
    const [currentId,setId] = useState("");
    const [openAddress,setAddress] = useState(false);
    const [addresses,setAddresses] = useState<shippingAddress[] | []>([]);
    useEffect(()=>{
      getUsers()
    },[])
  
    function handleChange(e:string, id:string){
      setRole(e);
      setId(id)
      setChange(true)
    }
  
   async function changeRole(){
    const role = {role:currentRole}
    const res = await fetch("/api/admin/users?id="+currentId,
    {method:"PUT", body:JSON.stringify(role)})
    const data= await res.json()
    if(data.success){
      setChange(false);
      getUsers()
    }else{
      setChange(false);
      alert("Someting is wring")

    }
   
   }
  async function getAddress(id:string){
    const res = await fetch("/api/user-private/address/get_address?id="+id,{method:"GET",cache:"no-store"})
    const data = await res.json()
    setAddresses(data.data)
     setAddress(true)
  }
    async function getUsers(){
      const res =  await fetch("/api/admin/users",{method:"GET",cache:"no-store"});
      const data = await res.json();
      setUsers(data.data)
    }
    return (
    <div className="flex flex-col items-center pt-24 pl-5">
        <h1 className=" text-left">
            Users
        </h1>
        {change && 
          <div className="fixed flex flex-row w-40 h-14 bg-white top-[200px] shadow-md z-50 p-5 items-center justify-around">
             <button onClick={()=>{changeRole()}} className="py-2 px-4 border">Ok</button>
             <button onClick={()=>{setChange(false)}} className="py-2 px-4 border">Cancel</button>
          </div>}
          {
            openAddress && 
            <div className="fixed w-full h-screen bg-white z-50">
               <div className="flex flex-row justify-end">
                <div className="pr-[200px]">
                 <button onClick={()=>setAddress(false)} >
                     <X/>
                 </button>
                 </div>
               </div>
                <div className="w-[350px] h-[300px] bg-white mx-auto  overflow-y-scroll">
               {
                addresses.map((addr:shippingAddress)=>{
                  return(<AddressOne 
                  key={addr._id}
                  _id={addr._id}
                  fullName={addr.shippingAddress.fullName}
                  address={addr.shippingAddress.address}
                  city={addr.shippingAddress.city}
                  postalCode={addr.shippingAddress.postalCode}
                  country={addr.shippingAddress.country}
                  phone={addr.shippingAddress.phone}
                />)
                })
               } 
                </div>
            </div>
          }
      <Table className="w-3/5 mx-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user:User) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user._id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select onChange={(e)=>handleChange(e.target.value,user._id)} >
                  <option selected={user.role==="authed"} value="authed">Authed</option>
                  <option selected={user.role==="user"} value="user">User</option>
                  <option selected={user.role==="admin"} value="admin">Admin</option>
                  <option selected={user.role==="block"} value="block">Block</option>
                </select>
        
              </TableCell>
              <TableCell>
                <button onClick={()=>getAddress(user._id)}>
                  See Address
                </button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
    )
  }
  

  function AddressOne({fullName,address,city,postalCode,country,phone}:Address){




   return (<>
    <form  className="w-full my-6 bg-orange-300 p-5 max-w-lg flex flex-col  py-2  ">
   <div className='flex flex-row justify-between border-b'> <label>FullName:</label><div> {fullName} </div></div>
   <div className='flex flex-row justify-between border-b'> <label>Address:</label><div> {address} </div>   </div>
   <div className='flex flex-row justify-between border-b'> <label>City:</label> <div>  {city}  </div></div>
   <div className='flex flex-row justify-between border-b'> <label>PostalCode:</label> <div> {postalCode} </div></div>
   <div className='flex flex-row justify-between border-b'><label>Country:</label> <div> {country} </div> </div>
   <div className='flex flex-row justify-between border-b'><label> Phone:</label> <div>  {phone}  </div></div>
   </form>
   
    </>
    )
}

