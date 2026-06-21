import net from 'net';
// Increase auto-select family attempt timeout to 2000ms to prevent ETIMEDOUT on IPv6/IPv4 transition
if (typeof net.setDefaultAutoSelectFamilyAttemptTimeout === 'function') {
  net.setDefaultAutoSelectFamilyAttemptTimeout(2000);
}

import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/db';
import logger from './middleware/logger';
import { usersRoute } from './modules/users/users.route';
import { todosRoute } from './modules/todos/todo.route';
import { authRoute } from './modules/auth/auth.route';


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

// auth routes
app.use('/auth', authRoute);


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