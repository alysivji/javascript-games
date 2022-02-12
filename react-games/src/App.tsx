import "./App.css";
import FullGame from "./mastermind/components/FullGame";

function App() {
  return (
    <div className="App">
      <FullGame numGuessesAllowed={8} />
    </div>
  );
}

export default App;
