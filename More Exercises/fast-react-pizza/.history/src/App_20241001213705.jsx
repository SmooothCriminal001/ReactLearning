import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./ui/Home"

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
              element:<
            }
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}