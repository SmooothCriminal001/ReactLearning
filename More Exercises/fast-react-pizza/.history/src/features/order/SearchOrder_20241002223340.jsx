export default function SearchOrder(){
    const [query, setQuery] = useState("")

     

    return <form onSubmit={handleSubmit}>
        <input 
            placeholder="Search Order #" 
            onChange={(e) => setQuery(e.target.value) } 
            value={query}
        />
    </form> 
    
}