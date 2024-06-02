import {Request, Response, NextFunction} from "express";
import { userService } from "../services/userService";
import jwt from "jsonwebtoken";
export const authMiddleware = {
    async authorize(req: any, res:Response, next: NextFunction){
        const bearerToken = req.headers.authorization;
        try{
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || "Rahasia"
            ) as { id: number };
            const user = await userService.findUserById(Number(tokenPayload.id));
            req.user = user;
            next();
        } catch {
            res.status(401).json({ message: 'Invalid token' });
        }            
    },

    async adminMiddleware(req: Request, res:Response, next:NextFunction) {
        if(!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        if ('role' in req.user && req.user.role !== 'admin' && req.user.role !=='superadmin') {
            return res.status(403).json({
                message: "Access Denied!"
            })
        }
        next();
    },

    async superadminMiddleware(req: Request, res:Response, next:NextFunction) {
        if(!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        if ('role' in req.user && req.user.role !=='superadmin') {
            return res.status(403).json({
                message: "Access Denied!"
            })
        }
        // if(req.user.role == 'superadmin') {
        //     return res.status(403).json({
        //         message: "Forbidden"
        //     })
        // }
        next();
    }
}
