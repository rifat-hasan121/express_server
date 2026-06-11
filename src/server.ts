import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/db';
import logger from './middleware/logger';
import { usersRoute } from './modules/users/users.route';


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
app.post('/todos', async(req: Request, res: Response)=>{
  const {user_id, title}=req.body;

  try {
    const result=await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
    res.status(200).json({
      success: true,
      message: 'Todo created successfully',
      data: result.rows[0],
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

app.get('/todos', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

app.get('/todos/:id', async(req:Request, res:Response)=>{
  const result= await pool.query(`SELECT * FROM todos WHERE id = $1`, [req.params.id]);

  try {
    if(result.rows.length===0){
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      })
    }else{
      res.status(200).json({
        success: true,
        message: 'Todo fetched successfully',
        data: result.rows[0],
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

app.put('/todos/:id',async(req:Request, res:Response)=>{
  const{title}=req.body;
  const result= await pool.query(`UPDATE todos SET title = $1 WHERE id = $2 RETURNING *`, [title, req.params.id])

  try {
    if(result.rows.length===0){
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      })
    }else{
      res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: result.rows[0],
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

app.delete('/todos/:id', async(req:Request, res:Response)=>{
  const result = await pool.query(`DELETE FROM todos WHERE id =$1 RETURNING *`, [req.params.id]);

  try {
    if(result.rowCount ===0){
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      })
    }else{
      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        data: null,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})


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