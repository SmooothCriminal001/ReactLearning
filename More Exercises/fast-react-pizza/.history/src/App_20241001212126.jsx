import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        element: <Component />,
        path: "path",
        children:[
            
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}