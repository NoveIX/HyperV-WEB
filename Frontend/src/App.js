import logo from './logo.svg';
import './App.css';
import VMList from "./components/VMList";
import ShutdownButton from "./components/ShutdownButton";

function App() {
  return (
    <div className="App">
      <h1>Gestione Hyper-V</h1>
      <ShutdownButton />
      <VMList />
    </div>
  );
}

export default App;
