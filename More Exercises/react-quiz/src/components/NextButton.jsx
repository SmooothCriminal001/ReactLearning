/* eslint-disable react/prop-types */
export default function NextButton({ onNext, numberOfQuestions, currentQuestionIndex, onFinish }){

    if(currentQuestionIndex < numberOfQuestions - 1){
        return <button className="btn btn-ui" onClick={onNext}>Next</button>
    }
    else{
        return <button className="btn btn-ui" onClick={onFinish}>Finish</button>
    }
}