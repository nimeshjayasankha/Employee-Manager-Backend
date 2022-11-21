import { Request, Response, NextFunction } from 'express';
import { response } from '../Utils/CommonResponse';
import EmployeeService from '../Services/Employee.Service';

export default class EmployeeController {
  private employeeService: EmployeeService = new EmployeeService();
  constructor() {
    this.employeeLists = this.employeeLists.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.getSingleEmployeeDetail = this.getSingleEmployeeDetail.bind(this);
    this.updateSingleEmployee = this.updateSingleEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  public async employeeLists(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeLists = await this.employeeService.employeeLists(req.query);
      return res
        .status(200)
        .json(response(200, 'Employee lists', employeeLists));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  public async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await this.employeeService.createEmployee(req.body);
      return res
        .status(201)
        .json(response(201, 'Successfully created employee', employee));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  public async getSingleEmployeeDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.id;
      const singleEmployeeDetail =
        await this.employeeService.getSingleEmployeeDetail(employeeId);
      if (!singleEmployeeDetail) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      return res
        .status(201)
        .json(response(201, 'Single employee', singleEmployeeDetail));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  public async updateSingleEmployee(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.empId;
      const singleEmployeeDetail =
        await this.employeeService.getSingleEmployeeDetail(employeeId);
      if (!singleEmployeeDetail) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      await this.employeeService.updateSingleEmployee(employeeId, req.body);
      return res
        .status(201)
        .json(response(201, 'Successfully updated the employee', []));
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }

  public async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = req.params.empId;
      const singleEmployeeDetail =
        await this.employeeService.getSingleEmployeeDetail(employeeId);

      if (!singleEmployeeDetail) {
        return res.status(404).json(response(404, 'Employee id not found', []));
      }
      await this.employeeService.deleteEmployee(employeeId);
      return res
        .status(201)
        .json(
          response(
            201,
            'Successfully deleted the employee',
            singleEmployeeDetail
          )
        );
    } catch (error) {
      console.log(error);
      return res.status(500).json(response(500, 'Something went wrong', []));
    }
  }
}
