import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./ui/Home"
import Menu from "./features/menu/Menu"

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
            }
            {
              path:"/cart",
              element:<Cart
            }
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}