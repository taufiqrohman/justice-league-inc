import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import Employee from "../models/employee";
import Button from "./Button";
import "./EmployeeForm.css";

export interface PropType {
  onSubmit: (employee: Employee) => void;
  employee?: Employee;
  onBack?: () => void;
}

function EmployeeForm({ employee, onSubmit, onBack }: PropType) {
  const context = useContext(EmployeeContext);
  const [name, setName] = useState<string>("");
  const [managerId, setManagerId] = useState<number>();

  const handleSubmit = function () {
    const payload: Employee = {
      employeeId: employee ? employee.employeeId : null,
      name,
      managerId,
    };

    onSubmit(payload);
  };

  useEffect(() => {
    if (context?.employees.length == 0) {
      context.fetchEmployees();
    }
  }, []);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setManagerId(employee.managerId);
    }
  }, [employee]);

  return (
    <div
      className="employee-form"
    >
      <div className="form-group">
        <label htmlFor="input-name">Name</label>
        <input
          type="text"
          value={name}
          id="input-name"
          name="name"
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="select-manager">Manager</label>
        <select
          name="select-manager"
          id="select-manager"
          value={managerId}
          onChange={(evt) => setManagerId(parseInt(evt.target.value))}
        >
          <option value="">No Manager</option>
          {(context?.employees || [])
            .filter((emp) =>
              employee ? emp.employeeId !== employee.employeeId : true
            )
            .map((employee) => (
              <option
                key={`option-${employee.employeeId}`}
                value={employee.employeeId?.toString()}
              >
                {employee.name}
              </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: "16px" }}>
        <Button variant="default" label="Back" onClick={onBack} />
        <Button
          variant="primary"
          label="Save"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default EmployeeForm;
