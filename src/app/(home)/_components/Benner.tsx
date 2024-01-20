import { TypeAnimation } from "react-type-animation";
export default function Benner() {
  return (
    <div className="flex w-full h-screen max-md:h-[300px] relative bg-black overflow-hidden text-white mt-0">
          <div className='absolute animate-bounce -left-16 top-40 w-[300px] h-[300px]  bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='absolute animate-bounce left-10 top-60 max-md:hidden rotate-45 w-[300px] h-[300px]  bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50%'></div>
      <div className='absolute animate-bounce -right-16 top-40 w-[300px] h-[300px]  bg-gradient-radial from-10% from-pink-500/50   to-white/50s rounded-sm to-50%'></div>
      <div className='absolute right-[350px]  top-60 max-md:-top-12 max-md:right-6  w-[300px] h-[300px] bg-gradient-radial from-10% from-blue-500   to-white/50s rounded-sm to-50%'></div>
      <div className='absolute animate-bounce right-16 max-md:hidden top-10 rotate-45 w-[300px] h-[300px]  bg-gradient-radial from-10% from-pink-500   to-white/50s rounded-sm to-50% '></div>
      <div className="flex flex-row w-full h-full justify-center items-center ">
         <div className="z-50 animate-pulse">
           <div className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600">
            <span >
               মোল্লার দোকান
            </span><br></br>
           <TypeAnimation
              sequence={[
                "স্বাগতম",
                1000,
                "সব কিছুই এখন হাতের নাগালে",
                1000,
                "পন্য আপনার বাড়িতে পৌছালে ",
                1000,
               "তাহলে আর দেরি কেন?",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            </div>
           <div className="text-xl text-center">এখনই কিনুন</div>
         </div>
      </div>
    </div>
  )
}
