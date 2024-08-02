/* eslint-disable react/prop-types */
import { useState } from "react"
import AccordionItem from "./AccordionItem"

export default function Accordion({faqs}){

    const [items, setItems] = useState(faqs)

    const openClickedItem = (item) => {
        setItems(previousItems => previousItems.map(eachItem => (
            eachItem.id === item.id ? {...eachItem, isOpen: !eachItem.isOpen} : {...eachItem, isOpen: false}
        )))
    }

    return <div className="accordion">
        {items.map(eachItem => {
            return <AccordionItem item={eachItem} key={eachItem.id} onItemClick={openClickedItem}>
                {eachItem.text}
            </AccordionItem>
        })}
    </div>
}