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
import Link from "next/link"
import { useEffect, useState } from "react"
import Product from '../../../models/Product';
import * as React from 'react';

  interface Product{
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
  
  interface Category{
    
_id:string;
categoryName:string;
categoryDescription:string;
categoryImage:string;
categorySlug:string;
subcategories:[

];
  }

  interface Subcategories{
    _id:string;
   
    categories:{
      _id:string,
      categoryName:string;
      categoryDescription:string;
      categoryImage:string;
      categorySlug:string;
    }
  }
  export default   function ProductsPage() {
   
   const [products , setProducts] = useState<Product[]|[]>([])
   const [categories, setCategories]= useState<Category [] | []>([])
   const [subcategories, setSubCategories]= useState<Subcategories [] | []>([])
   const [subOpen , setSubOpen] = useState(false)
   const [selectedCat , setSelectedCat] = useState("")
  const [openCat, setOpenCat] =  useState(false)
  const [openCat2, setOpenCat2] =  useState(false)
  const [category,setCategory] = useState({
    categoryName:"",
    categoryDescription:"",
    categoryImage:"",
    categorySlug:"",
    perent_id:''
  })
    useEffect(()=>{
      getProducts()
      getCategories()
    },[])
  

    async function getProducts(){
      const res = await fetch("/api/common/products?limit=100");
      const data = await res.json();
      setProducts(data.data)
    }
    async function getCategories(){
      const res = await fetch("/api/common/categories");
      const data = await res.json();
      setCategories(data.data)
    }

    async function getSubCategories(id:string) {
      getCatProducts(id);
      setSelectedCat(id);
      const res = await fetch("/api/common/categories/sub_categories?id="+id,{cache:"no-store"});
      const data = await res.json();
      setSubCategories(data.data);
      setSubOpen(true)
    }

    async function getCatProducts(id:string){
      const res = await fetch("/api/common/products/by_cat?id="+id,{cache:"no-store"});
      const data = await res.json();
      setSelectedCat(id);
      setProducts(data.data);
    }

    async function handleCatCreate(e:React.FormEvent) {
      e.preventDefault()
      let final={categoryName:category.categoryName,
      categoryDescription:category.categoryDescription,
      categoryImage:category.categoryImage,
      categorySlug:category.categorySlug,
      };
      const res=await fetch("/api/admin/categories/create_category?perent_id="+category.perent_id
        ,{method:"POST",body:JSON.stringify(final)})
      const data= await res.json()
      if(data.success===true){
        setOpenCat(false)
        getCategories()
        getSubCategories(selectedCat)
        setCategory({
          categoryName:"",
          categoryDescription:"",
          categoryImage:"",
          categorySlug:"",
          perent_id:''
        })
      }
   
    }
  function handleCatChange(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    setCategory({
      ...category,                   
      [e.target.name]: e.target.value 
    });
  }

  async function handleCatUpdate(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    let final={
      categoryName:category.categoryName,
      categoryDescription:category.categoryDescription,
      categoryImage:category.categoryImage,
      categorySlug:category.categorySlug,
      
      };
      const res=await fetch("/api/admin/categories/update_category?id="+selectedCat+"&perent_id="+category.perent_id
        ,{method:"POST",body:JSON.stringify(final)})
      const data= await res.json()
      console.log(data)
      console.log(selectedCat)
      if(data.success===true){
        getSubCategories(selectedCat)
        setOpenCat(false)
        setOpenCat2(false)
        setCategory({
          categoryName:"",
          categoryDescription:"",
          categoryImage:"",
          categorySlug:"",
          perent_id:''
        })
      }
  }

  function handleopenCat2(categoryName:string,categoryDescription:string,categoryImage:string,categorySlug:string,perent_id:string){
    setCategory({
      categoryName,
      categoryDescription,
      categoryImage,
      categorySlug,
      perent_id:" ",
    })
    setSelectedCat(perent_id);
    setOpenCat2(true)
  }
    return (
    
    <div className="flex flex-col items-center pt-24 pl-5">
        <div className="flex flex-row space-x-3">
                  
          {
            categories.map((cate:Category)=>{
              return (<div key={cate._id} className={`m-3 p-2  bg-gradient-to-r ${selectedCat === cate._id ? "from-green-300":"from-purple-300"}   rounded-md`}>
                       <button onClick={()=>getSubCategories(cate._id)}>{cate.categoryName+" "} </button> 
                       <button className="text-green-500 px-3" 
                      onClick={()=>handleopenCat2(cate.categoryName,
                                                    cate.categoryDescription,
                                                    cate.categoryImage,
                                                    cate.categorySlug,
                                                    cate._id
                                                )}>Edit</button>
                     </div>)
            })
          }
        </div>
        <div className="flex flex-row space-x-3">
          {subOpen &&
            subcategories.map((cate:Subcategories)=>{
              return (<div key={cate._id} className={`m-3 p-2  bg-gradient-to-r ${selectedCat ===cate.categories._id ? "from-green-300":"from-pink-300"}   rounded-md`}>
                       <button onClick={()=>getCatProducts(cate.categories._id)}>{cate.categories.categoryName+" "} </button> 
                      <button className="text-green-500 px-3" 
                      onClick={()=>handleopenCat2(cate.categories.categoryName,
                                                    cate.categories.categoryDescription,
                                                    cate.categories.categoryImage,
                                                    cate.categories.categorySlug,
                                                    cate.categories._id
                                                )}>Edit</button>
                     </div>)
            })
          }
          <button onClick={()=>setOpenCat(true)}>Add One+</button>
          {openCat && 
          <div className="fixed z-50 w-[300px] h-[300px] bg-white p-4 shadow-xl">
              
                <form onSubmit={handleCatCreate}>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryName" className=" border-b-2" value={category.categoryName} placeholder="categoryName"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryDescription" className="border-b-2" value={category.categoryDescription}  placeholder="categoryDescription"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryImage"  className="border-b-2" value={category.categoryImage} placeholder="categoryImage"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categorySlug"  className=" border-b-2" value={category.categorySlug} placeholder="categorySlug"/>
                  <select  onChange={handleCatChange} className=" border-b-2 w-full" name="perent_id" defaultValue={category.perent_id}>
                  {categories.map((cate:Category)=>{
                    return(<option key={cate._id} value={cate._id}>{cate.categoryName}</option>)
                  })}
                  </select>
                <button className="m-3 bg-green-600 rounded-xl text-white p-3" type="submit">Save</button>
                <button className="m-3" type="button" onClick={()=>setOpenCat(false)}>Cancel</button>
                </form>
          </div>
           }

      {openCat2 && 
          <div className="fixed z-50 w-[300px] h-[300px] bg-white p-4 shadow-xl">
              
                <form onSubmit={(e)=>handleCatUpdate(e)}>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryName" className=" border-b-2" value={category.categoryName} placeholder="categoryName"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryDescription" className="border-b-2" value={category.categoryDescription}  placeholder="categoryDescription"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categoryImage"  className="border-b-2" value={category.categoryImage} placeholder="categoryImage"/>
                  <input type="text" onChange={(e)=>handleCatChange(e)} name="categorySlug"  className=" border-b-2" value={category.categorySlug} placeholder="categorySlug"/>
                  <select  onChange={handleCatChange} className=" border-b-2 w-full" name="perent_id" defaultValue={category.perent_id}>
                  {categories.map((cate:Category)=>{
                    return(<option key={cate._id} value={cate._id}>{cate.categoryName}</option>)
                  })}
                  </select>
                <button className="m-3 bg-green-600 rounded-xl text-white p-3" type="submit">Save</button>
                <button className="m-3" type="button" onClick={()=>setOpenCat2(false)}>Cancel</button>
                </form>
          </div>
           }
        </div>
      <Table className="w-3/5 mx-auto">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product:Product) => {
      
           let p_id= product._id;
       
          return(
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.productImage}</TableCell>
              <TableCell className="font-medium">{product.productName}</TableCell>
              <TableCell>{product.productPrice}</TableCell>
              <TableCell>{product.productQuantity}</TableCell>
              <TableCell>{product.productDescription}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">
                   <Link href={"/deshboard/product/"+product._id}>Edit</Link> 
                </Button>
                {/* <DeleteProduct slug_id={p_id}/> */}
              </TableCell>
            </TableRow>
          )
        }
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right"><Link href="/deshboard/product">Add One+</Link> </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
    )
  }
  
