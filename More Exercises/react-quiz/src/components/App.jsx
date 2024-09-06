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
import Timer from "./Timer"

import { useQuiz } from "../contexts/QuizContext"

const statuses = {
  error: "error",
  loading: "loading",
  ready: "ready",
  active: "active",
  finish: "finish",
}

function App() {

  const { status, currentAnswerIndex } = useQuiz()

  return (
    <div className="app">
      <Header />
      {status == statuses.loading && <Loader />}
      {status == statuses.error && <Error />}
      <Content>
        {status == statuses.ready && 
          <Start />
        }
        {status == statuses.active && 
          <Question >
            <Progress />
            <Options />
            <Timer />
            {currentAnswerIndex != null &&
                <NextButton />
            }
          </Question>
        }
        
        {status === statuses.finish && 
          <Finish />
        }
      </Content>
    </div>
  )
}

export default App
