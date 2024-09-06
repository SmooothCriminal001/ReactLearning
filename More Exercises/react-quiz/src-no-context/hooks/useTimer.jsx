import { useEffect, useState } from "react";

export function useTimer(timerStart, maxTime, runOnTimerFinish){
    const [timer, setTimer] = useState(0)
    const [startTimer, setStartTimer] = useState(false)

    let minutes = Math.floor(timer / 60)
    minutes = Math.abs(minutes) < 10 ? `0${minutes}` : minutes
    let seconds = timer % 60
    seconds = Math.abs(seconds) < 10 ? `0${seconds}` : seconds

    useEffect(() => {
        if(timerStart){
            setTimer(maxTime)
            setStartTimer(true)
        }
    }, [timerStart, maxTime])

    console.log("Timer: " + timer)
    console.log("StartTimer: " + startTimer)
    useEffect(() => {
        if(startTimer){
            if(timer == 0){
                runOnTimerFinish()
                setStartTimer(false)
            }
            else if(timer > 0){
                const timeOutFn = setTimeout(() => {
                    setTimer((currentTimer) => currentTimer - 1)
                }, 1000)
        
                return () => clearTimeout(timeOutFn)
            }
        }
    }, [timer, startTimer, runOnTimerFinish])

    return [timer, minutes, seconds]
}