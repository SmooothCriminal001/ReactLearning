import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function Progress(){

    const { 
        index: currentIndex,
        points: currentPoints, 
        maxPossiblePoints: totalPoints, 
        currentAnswerIndex,
        questions 
    } = useQuiz()

    const totalQuestionsNumber = questions.length

    return <header className="progress">
        <progress max={totalQuestionsNumber} value={currentIndex + Number(currentAnswerIndex != null)} />
        <p>Question <strong>{currentIndex + 1}</strong>/{totalQuestionsNumber}</p>
        <p><strong>{currentPoints}</strong>/{totalPoints} points</p>
    </header>
}