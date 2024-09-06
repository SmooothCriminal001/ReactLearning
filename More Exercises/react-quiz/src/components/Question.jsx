import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function Question({  children }){

    const { currentQuestion } = useQuiz()

    return <div className="question">
        <h4>{currentQuestion.question}</h4>
        { children }
    </div>
}