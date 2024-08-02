/* eslint-disable react/prop-types */
export default function PackingItem({ item, onDeleteItem, onToggleItem }) {

    return (
      <li>
        <input type="checkbox" checked={item.packed} onChange={() => onToggleItem(item)}/>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item)}>❌</button>
      </li>
    );
  }
  