import React, { ReactNode, useState } from "react";
import Employee from "../models/employee";
import * as EmployeeRepositoy from "../repositories/Employee";

export interface EmployeeContextInterface {
  setEmployees: Function;
  employees: Array<Employee>;
  fetchEmployees: Function;
  employee_tree: Array<Employee>;
}

export var EmployeeContext =
  React.createContext<EmployeeContextInterface | null>(null);

const EmployeeProvider = ({ children }: any) => {
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [employee_tree, setEmployeeTree] = useState<Array<Employee>>([]);

  const fetchEmployees = function () {
    try {
      const result = EmployeeRepositoy.fetchEmployees();
      setEmployees(result);
      setEmployeeTree(EmployeeRepositoy.convertToTree(result));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees, fetchEmployees, employee_tree }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
