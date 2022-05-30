import "./App.css";
import EmployeeProvider from "./context/EmployeeContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <div className="App">
          <Routes>
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;
