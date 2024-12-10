import { ConfigProvider } from "antd"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./page/Login";
import Signup from "./page/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#22c55e",
      },}}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
