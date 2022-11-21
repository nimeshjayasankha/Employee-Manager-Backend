import { EmployeeCreation } from '../DTO/Employee.dto';
import { Employee } from '../Models/Employee';
export default class EmployeeRepository {
  public async employeeLists(
    search?: string,
    searchBy?: string,
    sort?: string,
    sortBy?: string
  ) {
    let value = search || '';
    let SortValue = sort || 'desc';
    let query: any = {};
    let sortQuery: any = {};
    query[searchBy as string] = { $regex: value, $options: 'i' };
    sortQuery[sortBy as string] = SortValue;
    const employeeLists = Employee.find(query).sort(sortQuery);
    return employeeLists;
  }

  public async createEmployee(data: EmployeeCreation) {
    const employee = await Employee.create(data);
    return employee;
  }

  public async getSingleEmployeeDetail(id: string) {
    const singleEmployee = Employee.findOne({ _id: id });
    return singleEmployee;
  }

  public async updateSingleEmployee(id: string, data: EmployeeCreation) {
    const singleEmployee = Employee.updateOne({ _id: id }, data, {
      new: true,
    });
    return singleEmployee;
  }

  public async deleteEmployee(id: string) {
    const deleteEmployee = Employee.deleteOne({ _id: id });
    return deleteEmployee;
  }
}
