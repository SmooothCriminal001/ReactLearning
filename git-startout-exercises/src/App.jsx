import './App.css'
//import Clicker from './Clicker'
//import PropertyList from './PropertyList'
import ColorBoxGrid from './ColorBoxGrid'

const properties = [
  { id:129031, name: "Desert Yurt", rating: 4.9, price:150 },
  { id:129032, name: "Lone Mountain Cabin", rating: 4.8, price:250 },
  { id:129033, name: "Cactus Retreat", rating: 4.75, price:300 },
  { id:129034, name: "Redwood Treehouse Escape", rating: 4.9, price:120 },
  { id:129035, name: "Oceanview Condo", rating: 4.7, price:140 },
  { id:129036, name: "Gold Miner Campground", rating: 4.69, price:96 },
]

const colors = [
  "#E53935",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

function App() {

  return (
    <>
      <ColorBoxGrid colors={colors}/>

      { /*
      <Clicker message="You are going to be infected!" buttonText="Don't click this!" />
      <Clicker message="You got infected!" buttonText="Really, don't click this!" />
        */
      }
      { /* <PropertyList list={properties} /> */ }
    </>
  )
}

export default App
