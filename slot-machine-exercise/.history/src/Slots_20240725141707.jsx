import "./Slots.css"

export default function Slots({ firstPull, secondPull, thirdPull}){
    const hasWon = (firstPull === secondPull) && (secondPull == thirdPull) ? "true" : "false"
    const announceStyle = { color: (hasWon ? "green" : "red")}

    return <>
        <h1>{firstPull} {secondPull} {thirdPull}</h1>
        <h2}>Test</h2>
    </>
}