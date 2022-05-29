import data from "../assets/organization-tree.json";
import Employee from "../models/employee";

const LS_KEY: string = "jl-data";

export async function populateData(): Promise<void> {
  const dataString = await window.localStorage.getItem(LS_KEY);
  if (dataString !== null) return;

  await window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export async function fetchEmployees(
  search: string | null
): Promise<Array<Employee>> {
  try {
    const stringData = await window.localStorage.getItem(LS_KEY);
    const employeeData: Array<Employee> = JSON.parse(stringData || "[]");

    return employeeData;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}

export function convertToTree(
  array_data: Array<Employee>,
  employeeId?: number
): Array<Employee> {
  return array_data
    .filter((employee) =>
      employeeId ? employeeId == employee.managerId : !employee.managerId
    )
    .map((employee) => ({
      ...employee,
      subordinates: convertToTree(array_data, employee.employeeId),
    }));
}
