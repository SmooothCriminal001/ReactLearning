export default function SearchOrder(){
    const [query, setQuery] = useState("")


    return <input placeholder="Search Order #" onChange={(e) => setQuery(e.target.value) } />
}