/* eslint-disable react/prop-types */
export default function Questions({ question, children }){
    return <div className="question">
        <h4>{question.question}</h4>
        { children }
    </div>
}