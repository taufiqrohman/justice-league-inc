import EmployeeForm from "../components/EmployeeForm";
import Employee from "../models/employee";
import { useNavigate } from "react-router-dom";
import { getMaxEmployeeId } from "../repositories/Employee";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

function AddEmployee() {
  const navigate = useNavigate();
  const context = useContext(EmployeeContext);

  const handleSubmit = function (payload: Employee) {
    const employee: Employee = {
      ...payload,
      employeeId: getMaxEmployeeId() + 1,
    };

    context?.addEmployee(employee);
    navigate("/");
  };

  const onBack = function () {
    navigate("/");
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} onBack={onBack} />
    </div>
  );
}

export default AddEmployee;
