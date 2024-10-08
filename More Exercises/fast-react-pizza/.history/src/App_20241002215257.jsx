import { RouterProvider, createBrowserRouter, useNavigation } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import { loader as menuLoader } from "./features/menu/Menu"

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        //errorElement: <ErrorComponent />,
        children:[
            {
              path:"/",
              element:<Home />
            },
            {
              path:"/menu",
              element:<Menu />,
              loader: menuLoader
            },
            {
              path:"/cart",
              element:<Cart />
            },
            {
              path:"/order/new",
              element:<CreateOrder />
            },
            {
              path:"/order/:orderId",
              element:<Order />
            }
        ]
    },
])

export default function App(){
    const navigation = useNavigation()
    console.log(JSON.stringify(navigation))
    return <RouterProvider router={router}></RouterProvider>
}