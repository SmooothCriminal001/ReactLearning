import './App.css'
import Slots from './Slots'

export default function App() {
  return (
    <div className="App">
      <Slots firstPull="H" secondPull="H" thirdPull="H"/>
      <Slots firstPull="H" secondPull="X" thirdPull="H"/>
      <Slots firstPull="H" secondPull="H" thirdPull="S"/>
    </div>
  ); 
}
