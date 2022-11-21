import server from '../../Utils/Server';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
  employeeCreationData,
  employeeCreationWithOutValues,
  employeeUpdateData,
} from '../Payload/Employee';
import { EmployeeCreation } from '../../DTO/Employee.dto';

const app = server();

const createEmployee = async (data: EmployeeCreation) => {
  const { statusCode, body } = await supertest(app)
    .post('/employee/')
    .send(data);
  return { statusCode, body };
};

const expectation = (value: any, toBe: any) => {
  return expect(value).toBe(toBe);
};

describe('employee', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  it('should return all employees with 200 status code', async () => {
    const { statusCode } = await supertest(app).get('/employee/');
    expectation(statusCode, 200);
  });

  it('should be able to save the employee', async () => {
    const { statusCode, body } = await createEmployee(employeeCreationData);
    expect(statusCode).toBe(201);
    expect(body.data.first_name).toBe(employeeCreationData.first_name);
    expect(body.data.last_name).toBe(employeeCreationData.last_name);
    expect(body.data.email).toBe(employeeCreationData.email);
    expect(body.data.number).toBe(employeeCreationData.number);
    expect(body.data.gender).toBe(employeeCreationData.gender);
  });

  it('required all the fields', async () => {
    const { statusCode } = await createEmployee(employeeCreationWithOutValues);
    expect(statusCode).toBe(422);
  });

  it('given employee id does not exist', async () => {
    const employeeId = '63778b82a99901d15862d363';
    const { statusCode } = await supertest(app).get(`/employee/${employeeId}`);
    expect(statusCode).toBe(404);
  });

  it('given employee id does exist', async () => {
    const { body } = await createEmployee(employeeCreationData);
    const { statusCode } = await supertest(app).get(
      `/employee/${body.data._id}`
    );
    expect(statusCode).toBe(201);
    expect(body.data._id).toBe(body.data._id);
  });

  it('delete employee record using valid id', async () => {
    const { body } = await createEmployee(employeeCreationData);
    const { statusCode } = await supertest(app).delete(
      `/employee/${body.data._id}`
    );
    expect(statusCode).toBe(201);
  });

  it('delete employee record using invalid id', async () => {
    const employeeId = '63778b82a99901d15862d363';

    const { statusCode } = await supertest(app).delete(
      `/employee/${employeeId}`
    );
    expect(statusCode).toBe(404);
  });

  it('update employee record using invalid id', async () => {
    const employeeId = '63778b82a99901d15862d363';
    const { statusCode } = await supertest(app)
      .put(`/employee/${employeeId}`)
      .send(employeeUpdateData);
    expect(statusCode).toBe(404);
  });

  it('update employee record using valid id', async () => {
    const { body } = await createEmployee(employeeCreationData);

    const { statusCode } = await supertest(app)
      .put(`/employee/${body.data._id}`)
      .send(employeeUpdateData);
    expect(statusCode).toBe(201); 
  });

  it('update employee without valid data', async () => {
    const { body } = await createEmployee(employeeCreationData);

    const { statusCode } = await supertest(app)
      .put(`/employee/${body.data._id}`)
      .send(employeeCreationWithOutValues);
    expect(statusCode).toBe(422);
  });
});
