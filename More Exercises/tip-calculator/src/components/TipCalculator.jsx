import { useState } from "react"
import BillForm from "./BillForm"
import OptionsForm from "./OptionsForm"
import Reset from "./Reset"
import TipDisplay from "./TipDisplay"

const initialAmount = 0
const initialTip = 0
const initialFriendTip = 0

export default function TipCalculator(){
    const [amount, setAmount] = useState(initialAmount)
    const [tip, setTip] = useState(initialTip)
    const [friendTip, setFriendTip] = useState(initialFriendTip)
    
    const resetAll = () => {
        setAmount(initialAmount)
        setTip(initialTip)
        setFriendTip(initialFriendTip)
    }
    
    return <>
        <BillForm onValueChange={(newAmount) => setAmount(newAmount)} valueToShow={amount} />
        <OptionsForm valueToShow={tip} label="How did you like the service?" onValueChange={(tip) => setTip(tip)}/>
        <OptionsForm valueToShow={friendTip} label="How did your friend like the service?" onValueChange={(friendTip) => setFriendTip(friendTip)}/>
        
        {amount > 0 && <>
            <TipDisplay amount={amount} tip={tip} friendTip={friendTip}/>
            <Reset onReset={resetAll}/>
            </>
        }   
    </>
}