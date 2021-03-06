import data from "../assets/organization-tree.json";
import Employee from "../models/employee";

const LS_KEY: string = "jl-data";

export function populateData(): void {
  const dataString = window.localStorage.getItem(LS_KEY);
  if (dataString !== null) return;

  window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function persistData(employee_data: Array<Employee>): void {
  window.localStorage.setItem(LS_KEY, JSON.stringify(employee_data));
}

export function fetchEmployees(): Array<Employee> {
  try {
    const stringData = window.localStorage.getItem(LS_KEY);
    const employeeData: Array<Employee> = JSON.parse(stringData || "[]");

    return employeeData;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}

export function filterEmployee(
  filter: string | null,
  employee_data: Array<Employee>
): Array<any> {
  const result: Array<Employee> = [];

  const searchNode = function (data: Array<Employee>) {
    data.forEach((employee) => {
      if (employee.name.toLowerCase() == filter?.toLowerCase()) {
        result.push(employee);
        return;
      }

      if (employee.subordinates) {
        return searchNode(employee.subordinates);
      }
    });
  };

  searchNode(employee_data);

  return result;
}

export function convertToTree(
  array_data: Array<Employee>,
  employeeId?: number | null
): Array<Employee> {
  return array_data
    .filter((employee) =>
      employeeId ? employee.managerId == employeeId : !employee.managerId
    )
    .map((employee) => ({
      ...employee,
      subordinates: convertToTree(array_data, employee.employeeId),
    }));
}

export function countSubordinates(
  employee: Employee,
  employee_data: Array<Employee>
): number {
  const subordinates = employee_data.filter(
    (emp) => emp.managerId == employee.employeeId
  );
  return (
    subordinates.length +
    subordinates.reduce((total: number, current: Employee) => {
      return total + countSubordinates(current, employee_data);
    }, 0)
  );
}

export function deleteEmployee(employeeId: number) {
  const currentEmployee = fetchEmployees();
  const updatedEmployee = currentEmployee.filter(
    (employee) => employee.employeeId !== employeeId
  );

  persistData(updatedEmployee);
}

export function getMaxEmployeeId(): number {
  const employee_data = fetchEmployees();
  if (employee_data.length == 0) return 0;

  const max = Math.max(
    ...employee_data.map((employee) => employee.employeeId || 0)
  );
  return max;
}

export function addEmployee(employee: Employee): void {
  const employee_data = fetchEmployees();
  employee_data.push(employee);

  persistData(employee_data);
}
