import React from 'react'
import {Formik} from "formik"
interface MyTyt{
    name: String, description:String,price:Number,amount:Number
}  
export default  function ProductCard() {
    const initialValues: MyTyt = { name: '', description: '',price:0,amount:0 }
  


  return (
    <div className=' fixed w-full h-full top-0 left-0  bg-white z-50'  >
      <div>
     <h1>Anywhere in your app!</h1>
   
   </div>
    </div>
  )
}
