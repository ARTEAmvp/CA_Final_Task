import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => console.log('connected to DB'))
  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log('application started on port', process.env.PORT);
});
