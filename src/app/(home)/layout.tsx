import Footer from "@/components/Footer"
import NavBar from "./_components/NavBar"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <div >
       <NavBar/>
        {children}
        {/* <Footer/> */}
    </div>
    )
  }