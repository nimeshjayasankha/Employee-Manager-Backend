import express from 'express';
import EmployeeController from '../Controllers/Employee.Controller';
import Validation from '../Middleware/Validation';
import { EmployeeSchema } from '../SchemaValidation/EmployeeSchema';

const employeeRoutes = express.Router();
const employeeController = new EmployeeController();

employeeRoutes.get('/', employeeController.employeeLists);
/**
 * validate the data before passing to the controller
 */
employeeRoutes.post(
  '/',
  Validation(EmployeeSchema),
  employeeController.createEmployee
);
employeeRoutes.get('/:id', employeeController.singleEmployee);
/**
 * validate the data before passing to the controller
 */
employeeRoutes.put(
  '/:empId',
  Validation(EmployeeSchema),
  employeeController.updateEmployee
);
employeeRoutes.delete('/:empId', employeeController.deleteEmployee);

export default employeeRoutes;
