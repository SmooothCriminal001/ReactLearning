import "./Slots.css"

export default function Slots({ firstPull, secondPull, thirdPull}){
    const hasWon = (firstPull === secondPull) && (secondPull == thirdPull)
    const announceStyle = { color: (hasWon ? "green" : "red")}

    return <>
        <h1>{firstPull} {secondPull} {thirdPull}</h1>
        <h2 style={announceStyle}>Test</h2>
    </>
}