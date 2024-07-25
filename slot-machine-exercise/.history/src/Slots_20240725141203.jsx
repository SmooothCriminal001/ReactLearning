import "./Slots.css"

export default function Slots({ firstPull, secondPull, thirdPull}){
    const hasWon = firstPull === secondPull === thirdPull ? "true" : "false"
    return <>
        <h1>{firstPull} {secondPull} {thirdPull}</h1>
        <h2>hasWon: {hasWon}</h2>
    </>
}