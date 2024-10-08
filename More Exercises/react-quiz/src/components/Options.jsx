import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function Options(){

    const { 
        currentQuestion: question, 
        onAnswerClick, 
        currentAnswerIndex: answerIndex 
    } = useQuiz()
    
    const hasBeenAnswered = answerIndex != null

    return <>{question.options.map((eachOption, i) => (
        <button 
            key={eachOption} 
            className={`btn btn-option 
                ${answerIndex === i ? ' answer' : ''}
                ${hasBeenAnswered ? (question.correctOption === i ? " correct" : " wrong") : ""}`} 
            onClick={() => onAnswerClick(i)}
            disabled = {hasBeenAnswered}
        >
            {eachOption}
        </button>
    ))}</>
}