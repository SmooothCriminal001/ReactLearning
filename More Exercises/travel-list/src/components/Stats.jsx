/* eslint-disable react/prop-types */
export default function Stats({items}) {
  
  if(items.length == 0){
    return <footer className="stats">
    <em>
      Start adding some items to your packing list 🚀
    </em>
    </footer>
  }

  const totalNumberOfItems = items.length
  const packedItemsNumber = items.filter(item => item.packed).length 
  const packedPercentage = Math.round((packedItemsNumber / totalNumberOfItems) * 100)
  
  return (
      <footer className="stats">
        <em>
        {packedPercentage < 100 && packedPercentage > 0 && `💼 You have ${totalNumberOfItems} items on your list, and you already packed ${packedItemsNumber} (${packedPercentage}%)`}
        {packedPercentage == 100 && "You got everything! Ready to go✈"}
        {packedPercentage == 0 && "You have not packed anything yet 😒"}
        </em>
      </footer>
    );
  }
  