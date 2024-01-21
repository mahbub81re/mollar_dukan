"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Star, StarOff, X } from "lucide-react";
type ProductData = {
  productName: string;
  productImage: string;
  productPrice: number;
  productDescription: string;
  productQuantity: number;
  mesurType: string;
  id: string;
  isBookmark: boolean;
};

export default function ProductCard({
  isBookmark,
  productName,
  productDescription,
  productImage,
  productPrice,
  productQuantity,
  mesurType,
  id,
}: ProductData) {
  const { data: session, status } = useSession();
  const [adding, setAdding] = useState(false);
  const [book, setBook] = useState(isBookmark);
  const [open, setOpen] = useState(false);
  async function add_to_cart() {
    setAdding(true);

    const res = await fetch("/api/user-private/cart/add_product", {
      body: JSON.stringify({ productID: id }),
      method: "POST",
    });
    const data = await res.json();
    if (!data.success) {
      toast(data.message);
    } else {
      toast("Product Added Successfully", { duration: 1000 });
      setAdding(false);
    }
  }

  useEffect(() => {
    setBook(isBookmark);
  }, [isBookmark]);

  async function addBookMark() {
    const res = await fetch("/api/user-private/bookmark/add", {
      method: "POST",
      body: JSON.stringify({ productID: id }),
    });
    const data = await res.json();
    if (data.success === true) {
      toast.success("Bookmarked");
      setBook(true);
    } else {
      toast.warning(data.message);
    }
  }

  async function deleteBookMark() {
    const res = await fetch("/api/user-private/bookmark/delete", {
      method: "POST",
      body: JSON.stringify({ productID: id }),
    });
    const data = await res.json();
    if (data.success === true) {
      toast.success("Deleted");
      setBook(false);
    } else {
      toast.warning(data.message);
    }
  }

  return (
    <Card className="max-sm:w-[280px] w-[240px]  border-none p-0 bg-white bg-gradient-to-tr from-[#004AAD] to-[#CB6CE6]">
      <CardContent className=" relative">
        {session && (
          <div className=" absolute right-0 p-3 ">
            {book ? (
              <Button onClick={deleteBookMark} className="text-green-500">
                <Star size={30} />
              </Button>
            ) : (
              <Button onClick={addBookMark}>
                <Star size={30} />
              </Button>
            )}
          </div>
        )}
        <Image
          src={
            "https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/" +
            productImage
          }
          width={250}
          height={250}
          className="w-full rounded-md "
          alt="product"
        />
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <div className="flex flex-row w-full leading-1 justify-between">
          <div className="p-2 max-w-[180px] overflow-hidden line-clamp-1 font-bold text-white">
            {productName}
          </div>
          {session && (
            <Button
              variant="outline"
              className="rounded-full px-3 mt-1 py-1 text-green-500 border-green-500"
              onClick={() => add_to_cart()}
            >
              {adding ? "Adding.." : "Add+"}
            </Button>
          )}
        </div>
        <div className="  line-clamp-auto leading-4">
          <div className="text-sm py-1 text-gray-200">
            Price: {productPrice}tk {" " + productQuantity + mesurType}
            {/* <del className='text-red-500'>100tk</del> */}
          </div>
          <div
            className=" text-gray-300 inline cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <span>{productDescription}</span>
          </div>
        </div>
      </CardFooter>
      {open && (
        <div className="fixed z-50 w-screen h-screen p-6 bg-white top-0 left-0 overflow-y-auto">
          <div className="flex flex-row justify-between shadow-md p-2">
            <div className="text-md">{productName}</div>
            <div onClick={() => setOpen(false)}>
              <X />
            </div>
          </div>
          <div className="flex flex-col">
            <Image
              src={
                "https://ocynpzblizvh6eisuwuoca.on.drv.tw/www.mahbub81r.com/" +
                productImage
              }
              width={300}
              height={200}
              className="w-[300px] overflow-hidden h-[200px] mt-3 rounded-md "
              alt="product"
            />

            <div className="text-md p-4 ">
              Price: {productPrice}tk {" " + productQuantity + mesurType}
              {/* <del className='text-red-500'>100tk</del> */}
            </div>
            {session && (
              <Button
                variant="outline"
                className="rounded-full px-3 mt-1 py-1 text-green-500 border-green-500"
                onClick={() => add_to_cart()}
              >
                {adding ? "Adding.." : "Add+"}
              </Button>
            )}

            <div className="p-4">{productDescription}</div>
          </div>
        </div>
      )}
    </Card>
  );
}
