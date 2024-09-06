/* eslint-disable react/prop-types */
export default function Progress({ currentIndex, totalQuestionsNumber, currentPoints, totalPoints, currentAnswerIndex}){
    return <header className="progress">
        <progress max={totalQuestionsNumber} value={currentIndex + Number(currentAnswerIndex != null)} />
        <p>Question <strong>{currentIndex + 1}</strong>/{totalQuestionsNumber}</p>
        <p><strong>{currentPoints}</strong>/{totalPoints} points</p>
    </header>
}