"use client"
import { Button } from "@/components/ui/button"
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
import { useEffect, useState } from "react"
  
  const users = [
    { 
      id:"1",
      user_id: "INV001",
      user_name:"sdfjk",
      phone: "344444444",
      amount:"300",
      type: "Accepted",
    }

  ]

  interface Order {
    user:{
      name:string;
      email:string;
    }
    orderItems:[{
      cty:number;
      product:{
        _id:string;
        productName:string;
        productDescription:string;
        productImage:string;
        productSlug:string;
        productPrice:string;   
        productQuantity:number;
        productFeatured:boolean;
        productCategory:string;
        mesurType:string;
      }
    }]
    shippingAddress:{
      shippingAddress:{
        fullName:string;
        address:string;
        city:string;
        postalCode:number;
        country:string;
        phone:string;
      }
    }
    itemsPrice:number;
    shippingPrice:number;
    taxPrice:number;
    totalPrice:number;
    isPaid:boolean;
    isDelivered:boolean;
    _id:string;
  }
  
  export default function Orders() {
    const [orders, setOrders] = useState<Order[]|[]>([])
     useEffect(()=>{
      getAllOrders()
     },[])

     async function getAllOrders(){
      const res = await fetch("/api/admin/orders/get_all_order",{cache:"no-store"});
      const data = await res.json();
      console.log(data)
      setOrders(data.data)
     }
    return (
    <div className="flex flex-col items-center pt-24 pl-5">
        <h1 className=" text-left">
            Orders
        </h1>
      <Table className="w-3/5 mx-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order:Order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order.user.name}</TableCell>
              <TableCell className="font-medium">{order.shippingAddress.shippingAddress.phone}</TableCell>
              <TableCell>{order.itemsPrice}</TableCell>
              <TableCell>{order.shippingAddress.shippingAddress.fullName}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">
                    View
                </Button>
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
  