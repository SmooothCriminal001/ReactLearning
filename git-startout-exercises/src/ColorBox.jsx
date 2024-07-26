import { useState } from "react"
import "./ColorBox.css"

export default function ColorBox({colors}){
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
    const [color, setColor] = useState(getRandomColor())

    const changeColor = () => {
        setColor(getRandomColor())
    }

    return <div className="ColorBox" onClick={changeColor} style={{backgroundColor: color}}></div>
}