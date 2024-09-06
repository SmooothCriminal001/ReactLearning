import { useQuiz } from "../contexts/QuizContext"

/* eslint-disable react/prop-types */
export default function NextButton(){

    const { 
        onNextClick: onNext, 
        index: currentQuestionIndex, 
        onFinishClick: onFinish,
        questions 
    } = useQuiz()

    const numberOfQuestions = questions.length

    if(currentQuestionIndex < numberOfQuestions - 1){
        return <button className="btn btn-ui" onClick={onNext}>Next</button>
    }
    else{
        return <button className="btn btn-ui" onClick={onFinish}>Finish</button>
    }
}