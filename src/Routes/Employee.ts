import express from 'express';
import EmployeeController from '../Controllers/Employee.Controller';
import Validation from '../Middleware/Validation';
import { EmployeeSchema } from '../SchemaValidation/EmployeeSchema';

const employeeRoutes = express.Router();
const employeeController = new EmployeeController();

employeeRoutes.get('/', employeeController.employeeLists);
employeeRoutes.post(
  '/',
  Validation(EmployeeSchema),
  employeeController.createEmployee
);
employeeRoutes.get('/:id', employeeController.getSingleEmployeeDetail);
employeeRoutes.put(
  '/:empId',
  Validation(EmployeeSchema),
  employeeController.updateSingleEmployee
);
employeeRoutes.delete('/:empId', employeeController.deleteEmployee);


export default employeeRoutes;
