import "./App.css";
import EmployeeProvider from "./context/EmployeeContext";
import Home from "./pages/Home";

function App() {
  

  return (
    <EmployeeProvider>
      <div className="App">
        <Home />
      </div>
    </EmployeeProvider>
  );
}

export default App;
