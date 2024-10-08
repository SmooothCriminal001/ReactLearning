import { useState } from "react"

export default function SearchOrder(){
    const [query, setQuery] = useState("")

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