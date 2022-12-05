import { Request, Response, NextFunction } from 'express';
import { response } from '../Utils/CommonResponse';
import EmployeeService from '../Services/Employee.Service';

export default class EmployeeController {
  private employeeService: EmployeeService = new EmployeeService();
  constructor() {
    this.employeeLists = this.employeeLists.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.singleEmployee = this.singleEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  /**
   * get employee lists from database with filter or without filter
   * @param req
   * @param res
   * @param next
   * @return {object} is for return employee lists
   */
  public async employeeLists(req: Request, res: Response, next: NextFunction) {
    console.info('employee lists endpoint');
    try {
      const employeeLists = await this.employeeService.employeeLists(req.query);
      return res
        .status(200)
        .json(response(200, 'Employee lists', employeeLists));
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  /**
   * create an employee using given data
   * @param req
   * @param res
   * @param next
   * @return {object} is for return the response is success or failure
   */
  public async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      console.info('create employee endpoint');
      const employee = await this.employeeService.createEmployee(req.body);
      return res
        .status(201)
        .json(response(201, 'Successfully created employee', employee));
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  /**
   * get single employee detail by given id
   * if there is no record for given id return status code 404
   * @param req
   * @param res
   * @param next
   * @return {object} is for return success or failure response
   */
  public async singleEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      console.info('single employee detail endpoint');
      const employeeId = req.params.id;
      const singleEmployee = await this.employeeService.singleEmployee(
        employeeId
      );
      if (!singleEmployee) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      return res
        .status(201)
        .json(response(201, 'Single employee', singleEmployee));
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  /**
   * update employee detail using given id and data
   * before update the record we checked id exists or not in the db
   * if id is exists user can update the record
   * @param req
   * @param res
   * @param next
   * @return {object} is for return success or failure response
   */

  public async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      console.info('update employee endpoint');
      const employeeId = req.params.empId;
      const singleEmployee = await this.employeeService.singleEmployee(
        employeeId
      );
      if (!singleEmployee) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      await this.employeeService.updateEmployee(employeeId, req.body);
      console.info('Successfully updated the employee by given id');
      return res
        .status(201)
        .json(response(201, 'Successfully updated the employee', []));
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  /**
   * delete the single employee using given id
   * before delete the record we check id exists or not
   * if id is exists user can delete the record
   * @return {object} is for return success or failure response
   */
  public async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      console.info('delete employee endpoint');
      const employeeId = req.params.empId;
      const singleEmployee = await this.employeeService.singleEmployee(
        employeeId
      );
      if (!singleEmployee) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      await this.employeeService.deleteEmployee(employeeId);
      return res
        .status(201)
        .json(
          response(201, 'Successfully deleted the employee', singleEmployee)
        );
    } catch (error) {
      console.error(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }
}
