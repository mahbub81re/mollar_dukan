import Footer from "@/components/Footer"
import NavBar from "./_components/NavBar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <div >
       <NavBar/>
        {children}
        {/* <ToastContainer/> */}
        {/* <Footer/> */}
    </div>
    )
  }