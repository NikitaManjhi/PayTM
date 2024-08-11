import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import SendMoney from "./pages/SendMoney";
import  Dashboard from "./pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "signup/",
    element: <Signup/>
  },
  {
    path: "signin/",
    element: <Signin/>
  },
  {
    path: "send/",
    element: <SendMoney/>
  },
  {
    path:"dashboard/",
    element: <Dashboard/>
  }
]);


export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}

