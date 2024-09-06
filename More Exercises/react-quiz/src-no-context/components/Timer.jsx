/* eslint-disable react/prop-types */
export default function Timer({ minutes, seconds}){
    return <p className="timer">
        {minutes}:{seconds}        
    </p>
}