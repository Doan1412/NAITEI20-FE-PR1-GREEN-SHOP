import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

const Layout: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
