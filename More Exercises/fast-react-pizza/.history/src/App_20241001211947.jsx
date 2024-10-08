import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        element: <Component />,
        path: "path",
        loader: loaderFunction,
        action: actionFunction,
        children:[
            
        ],
    },
])

export default function App(){
    return <div>
        Hello Vite!
    </div>
}