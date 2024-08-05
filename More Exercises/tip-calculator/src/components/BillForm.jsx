/* eslint-disable react/prop-types */
export default function BillForm({ valueToShow, onValueChange }){
    return <form>
        <label htmlFor="billAmount">How much was the bill? </label>
        <input 
            type="text" 
            name="billAmount" 
            placeholder="bill amount.." 
            value={valueToShow}
            onChange={(e) => onValueChange(Number(e.target.value)) }
            />
    </form>
}