import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/db';
import logger from './middleware/logger';
import { usersRoute } from './modules/users/users.route';
import { todosRoute } from './modules/todos/todo.route';


const app = express();
const port = config.port;

// body parser
app.use(express.json());

// initDB
initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/users', usersRoute);


// todos CURD
app.use('/todos', todosRoute);



// ROUTE NOT FOUND

app.use((req:Request, res:Response)=>{
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});