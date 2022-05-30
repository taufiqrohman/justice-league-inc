import { TreeItem } from "../components/TreeView";

interface Employee extends Omit<TreeItem, "subordinates"> {
  employeeId: number|null;
  managerId?: number;
  subordinates?: Array<Employee>;
  total_sub?: number;
}

export default Employee;
