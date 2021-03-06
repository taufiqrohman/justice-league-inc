import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TreeView from "../components/TreeView";
import { EmployeeContext } from "../context/EmployeeContext";
import Employee from "../models/employee";
import { filterEmployee } from "../repositories/Employee";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const [filtered_employees, setFilteredEmployees] = useState<Array<Employee>>(
    []
  );
  const [filter, setFilter] = useState<string | null>(null);
  const context = useContext(EmployeeContext);

  const filterData = function () {
    const result = filterEmployee(filter, context?.employee_tree || []);
    setFilteredEmployees(result);
  };

  const deleteEmployee = function (employee: Employee, index: number) {
    context?.deleteEmployee(employee);
  };

  useEffect(() => {
    context?.fetchEmployees();
  }, []);

  useEffect(() => {
    filterData();
  }, [filter]);

  return (
    <>
      <SearchBar onSearch={setFilter} />
      <div style={{ marginTop: "2em" }}>
        <Link to={"/add-employee"}>
          <Button variant="primary" label="Add Employee" />
        </Link>
      </div>
      <TreeView
        items={filter ? filtered_employees : context?.employee_tree || []}
        onItemDelete={(employee, index) => deleteEmployee(employee, index)}
      />
    </>
  );
}

export default Home;
