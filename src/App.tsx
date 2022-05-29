import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import TreeView from "./components/TreeView";
import Employee from "./models/employee";
import { convertToTree, fetchEmployees } from "./repositories/Employee";

function App() {
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  const getEmployees = async function () {
    const abc = await fetchEmployees(null);
    const data = convertToTree(abc);
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="App">
      <SearchBar />
      <TreeView items={employees} />
    </div>
  );
}

export default App;
