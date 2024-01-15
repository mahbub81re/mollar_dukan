"use client"
import React, { useState } from 'react'
import {useEffect} from 'react';
import HelpLine from '../_components/HelpLine';
interface Message {
    message:string;
    replaies:string[ ];
    userID:{name:string;email:string;_id:string};
   _id:string;
   read:boolean;
   }
export default function Messages() {
    const [messagesd ,setMessagesd] = useState<Message[]|[]>([])
    const [cmessage,setCMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [cuurent, setCurrent] = useState("")
    useEffect(()=>{
       getAllMessages()
    },[])


    async function getAllMessages(){
        const res = await fetch("/api/admin/reply_user");
        const data = await res.json();
        if(data.success===true){
            setMessagesd(data.data)
        }
    }

    async function reply(id:string) {
        const res = await fetch("/api/admin/reply_user",{method:"POST",body:JSON.stringify({id:id,message:cmessage})});
        const data = await res.json();
        if(data.success===true){
            getAllMessages()
           setCMessage("")
        }
    }
    

    function getUserAllmessage(id:string){
        setCurrent(id)
        setOpen(!open)
    }
  return (
    <div className='mt-24 flex flex-row justify-center z-20 text-black'>
         <div>

         {messagesd.map((message:Message)=>{
            let u =0;
            return(
                <div key={message._id} className='w-[400px] my-2'>
                  <div className='bg-black text-white p-2'>{message.userID.name} {message.userID.email} <button onClick={()=>getUserAllmessage(message.userID._id)}>All message</button></div>
                  <div>{message.message}</div>
                  <div>
                    {message.replaies.map((rep:string)=>{
                       u+=1;
                       return(<div className=' text-right' key={u}>{rep}</div>)
                     })}
                  </div>
                  <div className='bg-black text-white p-2 relative'>
                  <textarea  className='w-[240px] border-2 h-full bg-slate-300' onChange={(e)=>setCMessage(e.target.value)} value={cmessage} /><button className='w-[56px] h-[60px] bg-green-500 absolute right-0 top-0' onClick={(e)=>reply(message._id)}>Send</button>
                  </div>
                
                </div>
            )
         })}
         </div>
        {
            open && cuurent!=="" && <HelpLine id={cuurent}/>
        } 
    </div>
  )
}
