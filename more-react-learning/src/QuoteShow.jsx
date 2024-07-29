import { useState, useEffect } from "react";

const endpoint = "https://inspo-quotes-api.herokuapp.com/quotes/random"

function QuoteShow(){
    const [quote, setQuote] = useState({ text: "", author: ""})
    
    useEffect(() => {
        fetchQuote()
    }, [])

    async function fetchQuote(){
        const callResult = await fetch(endpoint)
        const quoteJson = await callResult.json()
        setQuote(quoteJson.quote)
    }
    
    return <>
        <h1>{quote.text}</h1>
        <h3>{quote.author}</h3>
        <button onClick={fetchQuote}>Get Quote!</button>
    </>
}

export default QuoteShow