import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServics } from "./user.servics";

const createUser =  async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
   const result = await userServics.createUser(name, email);
    res.status(201).json({
      success: true,
      data: result.rows[0],
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      success: false,
      message: error.message,
    })
  }
}

const getUser =  async (req: Request, res: Response) => {
  try {
    const result = await userServics.getUsers();
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

const getSingleUser =  async (req: Request, res: Response) => {
  try {
    const result = await userServics.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
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

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServics.updateUser(name, email, req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServics.deleteUser(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
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


export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}