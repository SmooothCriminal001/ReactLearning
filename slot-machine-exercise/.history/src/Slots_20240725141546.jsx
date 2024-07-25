import "./Slots.css"

export default function Slots({ firstPull, secondPull, thirdPull}){
    const hasWon = (firstPull === secondPull) && (secondPull == thirdPull) ? "true" : "false"
    const announceColor = hasWon ? "green" : "red"

    return <>
        <h1>{firstPull} {secondPull} {thirdPull}</h1>
        <h2 style="color: {announceColor}"}>Test</h2>
    </>
}