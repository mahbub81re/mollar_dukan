"use client"

import React, { ChangeEvent, useState } from 'react'
import AllCat from './_components/AllCat';
interface Product {
        productName:string,
        productDescription: string,
        productImage:string,
        productSlug: string,
        productPrice:number,
        productQuantity:number,
        productFeatured: true,
        productCategory: string,
        mesurType:string
}

export default function Product() {
  const [product, setProduct] = useState<Product>({
        productName: '',
        productDescription: '',
        productImage: '',
        productSlug: '',
        productPrice: 0,
        productQuantity: 0,
        productFeatured: true,
        productCategory: '',
        mesurType:""
  });
  const [error , setError] = useState<String>("")
  const [loading , setLoading] = useState<Boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
      setProduct({ ...product, [name]: value });
  }

  const handleSubmit  =async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
    setLoading(true);
  
    const finalData = { productName: product.productName,productFeatured:product.productFeatured, productDescription: product.productDescription, productImage:product.productImage,mesurType:product.mesurType, productSlug: product.productSlug , productPrice : product.productPrice , productQuantity : product.productQuantity , productCategory : product.productCategory}
    try {
      if ( !product.productName || !product.productDescription || !product.productImage || !product.productSlug || !product.productPrice || !product.productQuantity || !product.productCategory || !product.mesurType) {
        setError("please fill all the fields");
        return;
      }
      console.log("adding.")
      const res = await fetch("/api/admin/products/create",{method:"POST",body:JSON.stringify(finalData)});
      const data = await res.json();
      if (data.success == true || res.status == 200) {
        console.log("Product added successfully");
        setError("");
        setProduct({
          productName: '',
          productDescription: '',
          productImage: '',
          productSlug: '',
          productPrice: 0,
          productQuantity: 0,
          productFeatured: true,
          productCategory: '',
          mesurType:"",
        });
      }
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);

     
    }
  }
  return (
    <div className='flex pt-24 flex-col justify-center items-center'>
      <div className='w-[450px]  bg-red-500'>
        {error}
        <form className="w-full px-5 py-6 space-y-6"
              onSubmit={(event)=>handleSubmit(event)} >
           <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productName</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"text"}
                    placeholder="John Doe"
                    name="productName"
                    className="outline-none w-full px-4"
                    value={product.productName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productDescription</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <textarea
                    placeholder="..."
                    name="productDescription"
                    className="outline-none w-full px-4"
                    value={product.productDescription}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productImage</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"textarea"}
                    placeholder="..."
                    name="productImage"
                    className="outline-none w-full px-4"
                    value={product.productImage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productSlug</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"text"}
                    placeholder="..."
                    name="productSlug"
                    className="outline-none w-full px-4"
                    value={product.productSlug}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productPrice</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"number"}
                    placeholder="..."
                    name="productPrice"
                    className="outline-none w-full px-4"
                    value={product.productPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productQuantity</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"number"}
                    placeholder="..."
                    name="productQuantity"
                    className="outline-none w-full px-4"
                    value={product.productQuantity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Mesur Type</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <input
                    type={"text"}
                    placeholder="..."
                    name="mesurType"
                    className="outline-none w-full px-4"
                    value={product.mesurType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">productCategory</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <select  name="productCategory"  onChange={handleInputChange}  value={product.productCategory}>
                   <AllCat s_cat={product.productCategory}/>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                   <button type="submit">Submit</button>
                </div>
              </div>
        </form>
      </div>
    </div>
  )
  }