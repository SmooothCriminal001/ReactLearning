import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchOrder(){
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        if(!query) return

    }

    return <form onSubmit={handleSubmit}>
        <input 
            placeholder="Search Order #" 
            onChange={(e) => setQuery(e.target.value) } 
            value={query}
        />
    </form> 
    
}