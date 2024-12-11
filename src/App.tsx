import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Layout from "./layouts/Layout";
import UserProfile from "./page/UserProfile";
import { AuthProvider } from "./contexts/AuthContext";
import DetailProduct from "./page/detail";
import Home from "./page";
import Contact from "./page/contact";
import ProductPage from "./page/ProductPage";
import CartPage from "./page/Cart";
import SuccessPage from "./page/OrderSuccess";
import OrderListPage from "./page/OrderListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/products/:id",
        element: <DetailProduct />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/success_purchase",
        element: <SuccessPage />,
      },
      {
        path: "/orders",
        element: <OrderListPage />,
      }
    ],
  },
]);

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#22c55e",
        },
      }}
    >
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
