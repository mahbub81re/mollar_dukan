"use client"
import { CheckCheck, HelpCircle, MessageCircle, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
 interface Message {
  message:string;
  replaies:string[];
  userID:string;
 _id:string;
 read:boolean;
 }
export default function HelpLine({id}:{id:string}) {
 
    const {data:session} = useSession()
    const [messages , setMessages] = useState<Message [] | []>([])
    useEffect(()=>{
      getMessages()
    },[])


    const listInnerRef = useRef<HTMLDivElement | null>(null);

    const onScroll = () => {
      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight;
  
        if (isNearBottom) {
          console.log("Reached bottom");
          // DO SOMETHING HERE
        }
      }
    };
  
    useEffect(() => {
      const listInnerElement = listInnerRef.current;
  
      if (listInnerElement) {
        listInnerElement.addEventListener("scroll", onScroll);
  
        // Scroll to bottom when component mounts
        listInnerElement.scrollTop = listInnerElement.scrollHeight;
  
        // Clean-up
        return () => {
          listInnerElement.removeEventListener("scroll", onScroll);
        };
      }
    }, []);
  
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      if (listInnerRef.current) {
        listInnerRef.current.scrollTop = listInnerRef.current.scrollHeight;
      }
    };
  

    async function getMessages(){
          const res = await fetch("/api/user-private/message_admin?id="+id);
          const data = await res.json();
          if(data.success===true){
            setMessages(data.data);
            scrollToBottom()
          }
    }


  
  return (
    <div className='fixed bottom-0 right-0'>
       {session && 
          <>
           <button className='absolute bottom-0 right-0 w-18 h-18 bg-slate-50  p-4  rounded-full m-3'><MessageCircle/></button>
      
            <div className='w-[300px] drop-shadow-md border-2 h-[400px] bg-white'>
      
              <div className='w-full h-[290px] overflow-y-auto snap-end' ref={listInnerRef}>
                {/* Welcome message */}
                  <div>
                  <div  className='w-full flex justify-start items-end my-2'>
                                  <div className='max-w-[240px] inline bg-pink-500 rounded-md text-white px-3 py-2 ml-2'>
                                   <div className='text-xm text-gray-400'>Admin</div>
                                  WellCome to chat 
                                  </div>
                                </div>
                  </div>

                  {messages.map((message:Message)=>{
                    let u=0;
                    return( 
                    <div key={message._id} className='flex flex-col w-full '>
                 
                            {/* User  */}
                             <div className='w-full flex justify-end items-end my-2'>
                               <div className='max-w-[240px] inline bg-green-500 rounded-md text-white p-2 mr-2'>
                                    <div className='text-xs text-gray-400'>You {message.read===true &&  <CheckCheck className='inline text-xs' size={16}/>}</div>
                                    {message.message}
                               </div>
                              </div>
    
    
                             {/* Admin Reply */}
                            {message.replaies.map((rep)=>{
                              u+=1;
                              return( 
                               <div key={u} className='w-full flex justify-start items-end my-2'>
                                  <div className='max-w-[240px] inline bg-pink-500 rounded-md text-white px-3 py-2 ml-2'>
                                   <div className='text-xs text-gray-400'>Admin</div>
                                   {rep}
                                  </div>
                                </div>)
                            })}
                        </div>)
                  })}
                   

              </div>
             
           </div>
          
          </> 
       }
    
    </div>
  )
}
