import mongoose, { ClientSession, mongo } from 'mongoose';
import { EmployeeCreation, FilterEmployee } from '../DTO/Employee.dto';
import EmployeeRepository from '../Repository/Employee.Repository';

export default class EmployeeService {
  private employeeRepository: EmployeeRepository = new EmployeeRepository();

  /**
   * @typedef FilterEmployee
   * @prop {string} search The search keyword
   * @prop {string} sort The sort order
   * @prop {string} searchBy The sort field
   * @prop {string} sortBy The sort by
   *
   */
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

  /**
   * @typedef EmployeeCreation
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} photo The photo
   *
   */
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

  /**
   * @param {string} id employee id
   *
   */
  public async singleEmployee(id: string) {
    try {
      const singleEmployee = await this.employeeRepository.singleEmployee(id);
      return singleEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * @prop {string} id Employee id
   * @typedef EmployeeCreation
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} photo The photo
   */
  public async updateEmployee(id: string, data: EmployeeCreation) {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const updateEmployee = await this.employeeRepository.updateEmployee(
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

  /**
   * @param {string} id employee id
   *
   */
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

  /**
   * format employee creation payload in better way
   * @typedef EmployeeCreation
   * @prop {string} first_name The first name
   * @prop {string} last_name The last name
   * @prop {string} email The email
   * @prop {string} number The number
   * @prop {string} gender The gender
   * @prop {string} photo The photo
   */
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
