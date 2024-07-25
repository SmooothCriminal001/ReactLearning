import "./Slots.css"

export default function Slots({ firstPull, secondPull, thirdPull}){
    const hasWon = (firstPull === secondPull) && (secondPull == thirdPull)
    
    return <>
        <h1>{firstPull} {secondPull} {thirdPull}</h1>
        <h2 style={{color: hasWon ? "green" : "red"}}>{hasWon ? "You win!" : "You lose"}</h2>
        {hasWon && <h3>Congrats!</h3>}
    </>
}