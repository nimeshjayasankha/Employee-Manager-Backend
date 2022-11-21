import express from 'express';
import routes from '../Routes/Index';
import cors from 'cors';

function crateServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);

  return app;
}
export default crateServer;
