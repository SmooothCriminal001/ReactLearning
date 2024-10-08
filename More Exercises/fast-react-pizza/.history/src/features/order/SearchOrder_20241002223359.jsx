export default function SearchOrder(){
    const [query, setQuery] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        
    }

    return <form onSubmit={handleSubmit}>
        <input 
            placeholder="Search Order #" 
            onChange={(e) => setQuery(e.target.value) } 
            value={query}
        />
    </form> 
    
}