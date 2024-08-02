import { useState } from "react";


export default function DateCounter() {
    const stepInitialValue = 1
    const countInitialValue = 0 
    
    const [step, setStep] = useState(stepInitialValue);
    const [count, setCount] = useState(countInitialValue)

    const thisDate = new Date()
    thisDate.setDate(thisDate.getDate() + count)

    const resetAll = () => {
        setStep(stepInitialValue)
        setCount(countInitialValue)
    }

    /*
    function updateStep(stepChange){
        if(step == 1 && stepChange < 0){
            return
        }
        setStep((previousStep) => previousStep + stepChange)
    }
    */

    function updateCount(forward){
        setCount((previousCount) => {
            return previousCount + (forward ? 1 : -1) * step
        })
    }

    return (
        <>
            <div>
                {/* <button onClick={() => { updateStep(-1) }}>-</button>*/}
                <input type="range" value={step} min="1" max="10" onChange={(e) => setStep(Number(e.target.value))}/>
                {step}
                {/*<button onClick={() => { updateStep(1)}}>+</button>*/}
            </div>
            <div>
                <button onClick={() => { updateCount(false) }}>-</button>    
                <input value={count} onChange={(e) => setCount(Number(e.target.value))}/>
                <button onClick={() => { updateCount(true) }}>+</button>
            </div>
            <br />
            <div>
                {count == 0 ? `Today is ${thisDate.toDateString()}` : null}
                {count < 0 ? `${-1 * count} days before today was ${thisDate.toDateString()}` : null}
                {count > 0 ? `${count} days after today is ${thisDate.toDateString()}` : null}
            </div>
            <br/>
            {(step != stepInitialValue || count != countInitialValue) && <div>
                <button onClick={resetAll} style={{backgroundColor: "grey"}}>Reset</button>
            </div>}
        </>
    );
}
