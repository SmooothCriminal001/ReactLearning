import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./ui/AppLayout"

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children:[
            
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}