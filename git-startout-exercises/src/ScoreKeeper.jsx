import { useState } from "react"

export default function ScoreKeeper({numPlayers, target = 10}){
    
    const initialSetOfPlayers = () => {
        const playerSet = []

        for(let i = 0; i < numPlayers; i++){
            playerSet.push({
                playerId: i + 1,
                playerScore: 0,
                isWinner: false
            })
        }

        return playerSet
    }

    const updateScore = (playerId) => {
        setPlayers(previousPlayers => {
            return previousPlayers.map(eachPlayer => {
                if(eachPlayer.playerId === playerId){
                    return {...eachPlayer, playerScore: eachPlayer.playerScore + 1, isWinner: (eachPlayer.playerScore + 1 >= target)}
                }
                else{
                    return eachPlayer
                }
            })
        })
    }

    const resetAll = () => setPlayers(initialSetOfPlayers)

    const [ players, setPlayers ] = useState(initialSetOfPlayers)
    
    const playersLiList = players.map(eachPlayer => {
        return (
            <li key={eachPlayer.playerId}>
                <span>Player {eachPlayer.playerId}: {eachPlayer.playerScore}</span>
                <span><button onClick={() => updateScore(eachPlayer.playerId)}>+1</button></span>
                {eachPlayer.isWinner && <span>WINNER!</span>}
            </li>
        )
    })

    return <div>
        <ul>{playersLiList}</ul>
        <button onClick={resetAll}>Reset</button>
    </div>
}