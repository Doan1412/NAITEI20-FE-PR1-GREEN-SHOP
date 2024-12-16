import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { FilterProvider } from "../contexts/FilterContext";
import { CartProvider } from "../contexts/CartContext";

const Layout: React.FC = () => {
  return (
    <div className="w-full">
      <FilterProvider>
        <CartProvider>
          <Header />
          <Outlet />
          <Footer />
        </CartProvider>
      </FilterProvider>
    </div>
  );
};

export default Layout;
