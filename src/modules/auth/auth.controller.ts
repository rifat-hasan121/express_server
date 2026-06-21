import { Request, Response } from "express";
import { authService } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const result = await authService.loginUser(email, password)
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        })

    } catch (error: any) {
        res.status(400).json({
            status: 'error',
            success: false,
            message: error.message,
        })
    }
}

export const authController = {
    loginUser
}