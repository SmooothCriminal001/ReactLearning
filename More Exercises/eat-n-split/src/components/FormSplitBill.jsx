/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ friend, onBillSplit }){
    const [billAmount, setBillAmount] = useState(0)
    const [yourExpense, setYourExpense] = useState(0)
    const [billPayer, setBillPayer] = useState("user")

    const friendExpense = billAmount - yourExpense
    
    const handleBillSplit = (e) => {
        e.preventDefault()
        
        const billData = {
            billPayer: billPayer,
            friendExpense: friendExpense,
            userExpense: yourExpense
        }
        
        onBillSplit(friend, billData)
    }

    return <form className="form-split-bill">
        <h2>Split a bill with {friend.name}</h2>

        <label>💰 Bill value</label>
        <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value) }/>

        <label>🕴 Your Expense</label>
        <input type="number" value={yourExpense} onChange={(e) => setYourExpense(e.target.value) }/>

        <label>👬 { friend.name }'s Expense</label>
        <input type="number" value={friendExpense} disabled/>

        <label>🤑 Who is paying the bill?</label>
        <select value={billPayer} onChange={(e) => setBillPayer(e.target.value) }>
            <option value="user">You</option>
            <option value="friend">{ friend.name }</option>
        </select>

        <Button onClick={handleBillSplit}>Split Bill</Button>
    </form>
}