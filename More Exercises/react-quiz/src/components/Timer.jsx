import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function Timer(){
    const { minutes, seconds} = useQuiz()
    return <p className="timer">
        {minutes}:{seconds}        
    </p>
}