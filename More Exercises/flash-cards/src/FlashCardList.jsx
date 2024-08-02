import "./FlashCardList.css"
import FlashCard from "./FlashCard"
import { useState } from "react"

const flashCardsList = [
    { id:1, front: 'Test front', back: 'Test back', showsBack: false},
    { id:2, front: 'Some definition', back: 'Some word', showsBack: false},
    { id:3, front: 'Shouting at someone', back: 'Yell', showsBack: false},
    { id:4, front: 'Exceptionally good (adj)', back: 'Terrific', showsBack: false},
    { id:5, front: 'Very repulsive', back: 'Abominable', showsBack: false},
    { id:6, front: 'Friendly with others', back: 'Amiable', showsBack: false},
    { id:7, front: 'A shadowy projection of a person against strong background light', back: 'Silhouette', showsBack: false},
    { id:8, front: 'A fight between two people', back: 'Altercation', showsBack: false},
    { id:9, front: 'Throwing out a window', back: 'Defenestrate', showsBack: false},
]

export default function FlashCardList(){

    const [cards, setCards] = useState(flashCardsList)

    const onCardClick = (cardId) => {
        setCards((previousCards) => {
            return previousCards.map(card => (
                card.id == cardId ? {...card, showsBack: !card.showsBack} : {...card, showsBack: false} 
            ))
        })
    }

    return <div className="FlashCardList">
        {cards.map(eachCard => {
            return <FlashCard key={eachCard.id} cardDetail={eachCard} cardClick={() => onCardClick(eachCard.id)}/>
        })}
    </div>
}