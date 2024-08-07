import { useEffect } from "react"
import { useState } from "react"

export default function CurrencyConverter(){
    const [amount, setAmount] = useState(1)
    const [sourceCurrency, setSourceCurrency] = useState('EUR')
    const [destinationCurrency, setDestinationCurrency] = useState('USD')
    const [result, setResult] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    
    const startLoading = () => {
        setIsLoading(true)
        console.log('Loading start')
    }

    const stopLoading = () => {
        setIsLoading(false)
        console.log('Loading stop')
    }

    useEffect(() => {
        const controller = new AbortController()
        
        if(sourceCurrency == destinationCurrency){
            setResult(amount)
            return
        }

        async function convertCurrency(){
            try{
                console.log(`${amount}, ${sourceCurrency}, ${destinationCurrency}`)
                startLoading()

                const callResult = await fetch(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${sourceCurrency}&to=${destinationCurrency}`,
                    {signal: controller.signal}
                )
                const result = await callResult.json()
                console.log(`Result: ${JSON.stringify(result)}`)

                setResult(result.rates[destinationCurrency])
                stopLoading()
            }
            catch(err){
                if(err.name != 'AbortError'){
                    console.log(err.name)
                }
            }
        }

        convertCurrency()
        
        return () => {
            controller.abort() 
        }
    }, [amount, sourceCurrency, destinationCurrency])

    return <>
        <form>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value) }/>
            <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value) }>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={destinationCurrency} onChange={(e) => setDestinationCurrency(e.target.value) }>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>{isLoading ? "Loading" : `${result} ${destinationCurrency}`}</p>
        </form>
    </>
}