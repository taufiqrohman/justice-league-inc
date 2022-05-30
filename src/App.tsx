import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import TreeView from "./components/TreeView";
import Employee from "./models/employee";
import { fetchEmployees, filterEmployee } from "./repositories/Employee";

function App() {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [filtered_employees, setFilteredEmployees] = useState<Array<Employee>>(
    []
  );
  const [filter, setFilter] = useState<string | null>(null);

  const getEmployees = function () {
    const employee_data = fetchEmployees();
    setEmployees(employee_data);
  };

  const filterData = function () {
    const result = filterEmployee(filter, employees);
    setFilteredEmployees(result);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    filterData();
  }, [filter]);

  return (
    <div className="App">
      <SearchBar onSearch={setFilter} />
      <TreeView items={filter ? filtered_employees : employees} />
    </div>
  );
}

export default App;
