import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import UserRouter from './src/routes/user.js'
import QuestionRouter from './src/routes/question.js'
import AnswerRouter from './src/routes/answer.js'
import ActionRouter from './src/routes/action.js'

const app = express();

app.use(cors());

app.use(express.json());
app.use(UserRouter);
app.use(QuestionRouter)
app.use(AnswerRouter)
app.use(ActionRouter)

mongoose
  .connect(process.env.MONGOOSE_CONNECTION)
  .then(() => console.log('connected to DB'))
  .catch(err => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log('application started on port', process.env.PORT);
});