import { useEffect, useReducer } from "react"
import Content from "./Content"
import Header from "./Header"
import Error from "./Error"
import Loader from "./Loader"
import Start from "./Start"
import Question from "./Question"
import Options from "./Options"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finish from "./Finish"
import { useTimer } from "../hooks/useTimer"
import Timer from "./Timer"

const SECS_EACH_QUESTION = 30

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

function App() {

  const [{
    questions,
    status,
    index,
    currentAnswerIndex,
    points
  }, dispatch] = useReducer(reducer, initialData)

  const [, minutes, seconds] = useTimer(
    status == statuses.active,
    (questions.length * SECS_EACH_QUESTION),
    () => { dispatch({ type: types.onFinish })}
  )

  useEffect(() => {
    async function getJsonData(){
      try{
        const data = await fetch("http://localhost:8000/questions");
        const json = await data.json();

        dispatch({type: types.loadQuestions, payload: json})
      }
      catch(e){
        dispatch({type: types.loadError})
      }
    }

    getJsonData()
  }, [dispatch])
  
  const currentQuestion = questions[index]
  const maxPossiblePoints = questions.length > 0
   ? questions.map(eachQuestion => eachQuestion.points).reduce((acc, eachPoint) => acc + eachPoint)
   : 0


  return (
    <div className="app">
      <Header />
      {status == statuses.loading && <Loader />}
      {status == statuses.error && <Error />}
      <Content>
        {status == statuses.ready && 
          <Start 
            numOfQuestions={questions.length} 
            onstartClick={() => dispatch({type: types.quizStart})}
          />
        }
        {status == statuses.active && 
          <Question question={currentQuestion}>
            <Progress 
              currentAnswerIndex={ currentAnswerIndex }
              currentIndex={ index }
              totalQuestionsNumber={ questions.length }
              currentPoints={ points }
              totalPoints= { maxPossiblePoints }
            />
            <Options 
              question={currentQuestion} 
              onAnswerClick={(clickedIndex) => dispatch({type: types.onAnswering, payload: clickedIndex})}
              answerIndex={currentAnswerIndex}
            />
            <Timer minutes={minutes} seconds={seconds} />
            {currentAnswerIndex != null &&
                <NextButton 
                  currentAnswerIndex={currentAnswerIndex} 
                  onNext = {() => dispatch({type: types.onNextClick})}
                  currentQuestionIndex={ index }
                  numberOfQuestions={ questions.length }
                  onFinish = {() => dispatch({type: types.onFinish})}
              />
            }
          </Question>
        }
        
        {status === statuses.finish && 
          <Finish points={points} maxPossiblePoints={ maxPossiblePoints } onRestart={() => dispatch({type: types.onRestart})}/>
        }
      </Content>
    </div>
  )
}

export default App
