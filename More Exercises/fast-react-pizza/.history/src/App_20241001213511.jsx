import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./ui/AppLayout"

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorComponent />,
        children:[
            {
              path:"/",
              element:<Home
            }
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}