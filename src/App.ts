import mongoose from 'mongoose';
import crateServer from './Utils/Server';
require('dotenv/config');

const app = crateServer();
mongoose
  .connect(<string>process.env.MONGOOSE_URL)
  .then((result) => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4000, () => {
  console.log('Application listen at 4000');
});

export default app;
