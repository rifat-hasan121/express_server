import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized!!",
            })
        }

        try {
            const decodedToken = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
            req.user = decodedToken;
            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or expired token",
                error: error.message
            });
        }
    }
}

export default auth;