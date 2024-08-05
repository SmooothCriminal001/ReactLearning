/* eslint-disable react/prop-types */
import "../css/OptionsForm.css"

export default function OptionsForm({label, onValueChange, valueToShow}){
    return <form className="OptionsForm">
        <label>{label} </label>
        <select value={valueToShow} onChange={(e) => onValueChange(Number(e.target.value)) }>
            <option value={0}>Dissatisfied (0%)</option>
            <option value={5}>It was okay (5%)</option>
            <option value={10}>It was good (10%)</option>
            <option value={20}>Absolutely Amazing (20%)</option>
        </select>
    </form>
}