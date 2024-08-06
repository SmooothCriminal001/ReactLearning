/* eslint-disable react/prop-types */
import { useState } from "react"

export default function TextExpander({ 
    children, 
    clipLength = 100, 
    showMoreText = "Show more", 
    showLessText = "Show less",
    textColor = "",
    startWithShowing = false,
    styleClass = ""
}){
    const [moreShowing, setMoreShowing] = useState(startWithShowing)
    
    const lengthIsLessThanClip = children.length <= clipLength
    const textToShow = (lengthIsLessThanClip || moreShowing) ? children : `${children.slice(0, clipLength)}...`
    
    return <>
        <p className={styleClass}>
            {textToShow}
            {!lengthIsLessThanClip && <a href="#" onClick= {() => setMoreShowing((previousShow) => !previousShow)} style={textColor ? {color: textColor} : null}>
                {moreShowing ? showLessText : showMoreText}
            </a>}
        </p> 
    </>
}