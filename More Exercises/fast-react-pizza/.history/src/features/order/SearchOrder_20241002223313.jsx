export default function SearchOrder(){
    const [query, setQuery] = useState("")


    return <form>
        <input 
            placeholder="Search Order #" 
            onChange={(e) => setQuery(e.target.value) } />
    </form> 
    
}