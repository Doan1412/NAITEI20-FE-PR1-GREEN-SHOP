import { Outlet } from "react-router"
import Header from "./Header"

const Layout: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
