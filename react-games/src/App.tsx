import "./App.css";
import MastermindGame from "./mastermind/components/MastermindGame";

function App() {
  return (
    <div className="App">
      <MastermindGame numGuessesAllowed={8} />
    </div>
  );
}

export default App;
