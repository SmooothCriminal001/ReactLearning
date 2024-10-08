import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Cart from "./features/cart/Cart"

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorComponent />,
        children:[
            {
              path:"/",
              element:<Home />
            },
            {
              path:"/menu",
              element:<Menu />
            },
            {
              path:"/cart",
              element:<Cart />
            },
            {
              path:"/order/new",
              element:
            }
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}