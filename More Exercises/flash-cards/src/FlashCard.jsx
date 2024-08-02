/* eslint-disable react/prop-types */
import "./FlashCard.css"

export default function FlashCard({cardDetail, cardClick}){

    const showSide = cardDetail.showsBack ? "back" : "front"
    const style = { backgroundColor: cardDetail.showsBack ? "indianred" : "lightgrey"}

    return <div className="FlashCard" style={style} onClick={cardClick}>
        {cardDetail[showSide]}
    </div>
}