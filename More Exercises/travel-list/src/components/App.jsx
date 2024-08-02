import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { useState } from "react";

const initialItems = [
  { id: crypto.randomUUID(), description: "Passports", quantity: 2, packed: false },
  { id: crypto.randomUUID(), description: "Socks", quantity: 12, packed: true },
  { id: crypto.randomUUID(), description: "Toiletry", quantity: 1, packed: false },
  { id: crypto.randomUUID(), description: "T-shirts", quantity: 4, packed: true },
  { id: crypto.randomUUID(), description: "Shorts", quantity: 2, packed: false },
  { id: crypto.randomUUID(), description: "Chargers", quantity: 2, packed: false },
  { id: crypto.randomUUID(), description: "Books", quantity: 2, packed: false },
  { id: crypto.randomUUID(), description: "Laptop", quantity: 1, packed: false },
];

function App() {

  const [items, setItems] = useState(initialItems)

  const addItem = (item) => {
    setItems(oldItems => {
      return [...oldItems, item]
    })
  }

  const deleteItem = (item) => {
    setItems(oldItems => oldItems.filter(eachItem => eachItem.id !== item.id))
  }

  const toggleItem = (item) => {
    setItems(oldItems => oldItems.map(
      eachItem => eachItem.id === item.id ? {...eachItem, packed: !eachItem.packed} : eachItem
    ))
  }

  const clearItems = () => {
    setItems([])
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItem={addItem}/>
      <PackingList items={items} onDeleteItem={deleteItem} onToggleItem={toggleItem} onClearItems={clearItems}/>
      <Stats items={items}/>
    </div>
  )
}

export default App
