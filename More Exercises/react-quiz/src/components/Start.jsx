import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function Start(){
    const { questions, onQuizStart } = useQuiz()
    const numOfQuestions = questions.length

    return <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numOfQuestions} questions to test your React mastery</h3>
        <button className="btn btn-ui" onClick={onQuizStart}>Let's start</button>
    </div>
}