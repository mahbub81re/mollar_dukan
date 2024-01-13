import axios from "axios"
import { useEffect, useState } from "react"

export default   function  AllCat({s_cat}:{s_cat:string}) {
     const [catagories, setCat]= useState([])
    useEffect(()=>{
       getCatagoy()
    })

    async function getCatagoy(){
        const res = await fetch("/api/common/categories/all_cat",{method:"GET"});
        const data = await res.json();
        setCat(data.data)
    }
  return (
    <>
    {catagories.map((opt:any)=>( <option key={opt._id} selected={s_cat===opt._id} value={opt._id}>{opt.categoryName}</option>))} 
    
    </>
  )
}
