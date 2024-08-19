/* eslint-disable react/prop-types */
export default function Finish({ points, maxPossiblePoints, onRestart }){
    const percentage = Math.ceil(points/maxPossiblePoints * 100)
    let emoji

    if(percentage === 100) emoji = "🥇"
    else if(percentage >= 80) emoji = "🎉"
    else if(percentage >= 50) emoji = "🙌"
    else if(percentage > 0) emoji = "🤔"
    else if(percentage == 0) emoji = "🤦‍♂️"

    return <>
        <p className="result"><span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%)</p>
        <p><button className="btn btn-ui" onClick={onRestart}>Restart Quiz</button></p>
    </>
}