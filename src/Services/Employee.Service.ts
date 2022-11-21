import mongoose, { ClientSession, mongo } from 'mongoose';
import { EmployeeCreation, FilterEmployee } from '../DTO/Employee.dto';
import EmployeeRepository from '../Repository/Employee.Repository';

export default class EmployeeService {
  private employeeRepository: EmployeeRepository = new EmployeeRepository();

  public async employeeLists(data: FilterEmployee) {
    try {
      const { search, sort, searchBy, sortBy } = data;
      const employeeLists = await this.employeeRepository.employeeLists(
        search,
        searchBy,
        sort,
        sortBy
      );
      return employeeLists;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async createEmployee(data: EmployeeCreation) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const employee = this.employeeRepository.createEmployee(
        this.employeePayload(data)
      );
      session.commitTransaction();
      return employee;
    } catch (error) {
      console.log(error);
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async getSingleEmployeeDetail(id: string) {
    try {
      const getSingleEmployeeDetail =
        await this.employeeRepository.getSingleEmployeeDetail(id);
      return getSingleEmployeeDetail;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateSingleEmployee(id: string, data: EmployeeCreation) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const updateEmployee = await this.employeeRepository.updateSingleEmployee(
        id,
        this.employeePayload(data)
      );
      session.commitTransaction();
      return updateEmployee;
    } catch (error) {
      console.log(error);
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public async deleteEmployee(id: string) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const deleteEmployee = await this.employeeRepository.deleteEmployee(id);
      session.commitTransaction();
      return deleteEmployee;
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  employeePayload = (data: EmployeeCreation) => {
    return {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      number: data.number,
      gender: data.gender,
      photo:
        data.photo ??
        'https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=',
    };
  };
}
