/* eslint-disable react/prop-types */
import "../css/TipDisplay.css"

export default function TipDisplay({amount, tip, friendTip}){
    
    const tipAverage = (Math.round((tip + friendTip) / 2)) * (amount / 100)
    
    return <div className="TipDisplay">
        You pay ${amount + tipAverage} (${amount} + ${tipAverage} tip)
    </div>
}