import { Router } from 'express';
import EmployeeRoutes from './Employee';

const routes = Router();

routes.use('/employee', EmployeeRoutes);

export default routes;
