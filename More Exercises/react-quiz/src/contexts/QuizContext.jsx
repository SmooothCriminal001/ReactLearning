/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react"
import { useTimer } from "../hooks/useTimer"

const QuizContext = createContext()
const SECS_EACH_QUESTION = 1

const types = {
    loadQuestions: "loadQuestions",
    loadError: "loadError",
    quizStart: "quizStart",
    onAnswering: "onAnswering",
    onNextClick: "onNextClick",
    onFinish: "onFinish",
    onRestart: "onRestart",
}

const statuses = {
    error: "error",
    loading: "loading",
    ready: "ready",
    active: "active",
    finish: "finish",
}

const initialData = {
    questions: [],
    status: statuses.loading,
    index: 0,
    currentAnswerIndex: null,
    points: 0
}

const reducer = (state, {type, payload}) => {
    switch(type) {
        case types.loadQuestions:
          return {...state, status: statuses.ready, questions: payload}
        case types.loadError:
          return {...state, status: statuses.error}
        case types.quizStart:
          return {...state, status: statuses.active}
        case types.onAnswering:
          {
            const currentQuestion = state.questions[state.index]
            return {
              ...state, 
              currentAnswerIndex: payload,
              points: (currentQuestion.correctOption === payload ? state.points + currentQuestion.points : state.points)
            }
          }
        case types.onNextClick:
          return {
            ...state,
            index: state.index + 1,
            currentAnswerIndex: null
          }
        case types.onFinish:
          return{
            ...state,
            currentAnswerIndex: null,
            status: statuses.finish
          }
        case types.onRestart:
          return {
            ...initialData,
            questions: state.questions,
            status: statuses.ready
          }
        default:
          console.log("error")
    }
}

function QuizProvider( { children } ){
    
    const [{
        questions,
        status,
        index,
        currentAnswerIndex,
        points
    }, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        async function getJsonData(){
          try{
            const data = await fetch("http://localhost:9000/questions");
            const json = await data.json();
    
            dispatch({type: types.loadQuestions, payload: json})
          }
          catch(e){
            dispatch({type: types.loadError})
          }
        }
        getJsonData()
    }, [dispatch])

    const onQuizStart = () => { dispatch({type: types.quizStart}) }

    const onAnswerClick = (clickedIndex) => dispatch({type: types.onAnswering, payload: clickedIndex})

    const onNextClick = () => dispatch({type: types.onNextClick})

    const onFinishClick = () => dispatch({type: types.onFinish})

    const onRestart = () => dispatch({type: types.onRestart})

    const [, minutes, seconds] = useTimer(
        status == statuses.active,
        (questions.length * SECS_EACH_QUESTION),
        () => { dispatch({ type: types.onFinish })}
    )
      
    const currentQuestion = questions[index]
    const maxPossiblePoints = questions.length > 0
       ? questions.map(eachQuestion => eachQuestion.points).reduce((acc, eachPoint) => acc + eachPoint)
       : 0

    return <QuizContext.Provider value={{
        questions,
        status, 
        index,
        currentAnswerIndex,
        points,
        minutes,
        seconds,
        currentQuestion,
        maxPossiblePoints,
        onQuizStart,
        onAnswerClick,
        onNextClick,
        onFinishClick,
        onRestart       
    }}>
        {children}
    </QuizContext.Provider>
}

const useQuiz = () => {
    const quiz = useContext(QuizContext)

    if(!quiz){
        throw new Error("QuizContext is used outside of its scope")
    }

    return quiz
}

export { QuizProvider, useQuiz}