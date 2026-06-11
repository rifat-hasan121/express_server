import { Request, Response } from "express";
import { todoServics } from "./todo.servics";

const createTodo = async(req: Request, res: Response)=>{

  try {
    const result= await todoServics.createTodo(req.body);
    
    res.status(201).json({
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
}

const getTodos =  async (req: Request, res: Response) => {
  try {
    const result = await todoServics.getTodos();
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
}

const getSingleTodo = async(req:Request, res:Response)=>{
  const result= await todoServics.getSingleTodo(req.params.id as string);

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
}
const updateTodo = async(req:Request, res:Response)=>{
   const result = await todoServics.updateTodo(req.body, req.params.id as string);

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
}

const deleteTodo = async(req:Request, res:Response)=>{
  const result = await todoServics.deleteTodo(req.params.id as string);

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
}

export const todoController = {
    createTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
}