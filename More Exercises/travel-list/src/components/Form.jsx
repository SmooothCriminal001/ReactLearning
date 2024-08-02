/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Form({onAddItem}) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(!description) return

    const item = {
      id: crypto.randomUUID(),
      description: description,
      quantity: quantity,
      packed: false
    }
    onAddItem(item)

    setDescription('')
    setQuantity(1)
  }  
  
  return (
      <form className="add-form" onSubmit={handleOnSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
          {Array.from({length: 20}, (_, index) => ( index + 1 ))
            .map(eachItem => {
              return <option key={eachItem}>{eachItem}</option>
            })
          }
        </select>
        <input type="text" placeholder="Item..." onChange={(e) => setDescription(e.target.value)} value={description}/>
        <button type="submit">ADD</button>
      </form>
    );
  }
  