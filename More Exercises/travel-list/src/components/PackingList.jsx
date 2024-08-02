/* eslint-disable react/prop-types */
import { useState } from "react";
import PackingItem from "./PackingItem";


export default function PackingList({items, onDeleteItem, onToggleItem, onClearItems}) {
  const [sortCriteria, setSortCriteria] = useState("input")

  let sortedItems
  if(sortCriteria == "input"){
    sortedItems = items
  }
  else if(sortCriteria == "description"){
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description))
  }
  else if(sortCriteria == "packed"){
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed))
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((eachItem) => (
          <PackingItem 
            key={eachItem.id} 
            item={eachItem} 
            onDeleteItem={onDeleteItem} 
            onToggleItem={onToggleItem}
            />
        ))}
      </ul>

      <div className="actions">
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="input">Input order</option>
          <option value="description">Description</option>
          <option value="packed">Packed Status</option>
        </select>
        <button onClick={onClearItems}>Clear</button>
      </div>
    </div>
  );
}