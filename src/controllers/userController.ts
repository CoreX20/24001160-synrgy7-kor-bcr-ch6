import { userService } from "../services/userService";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

export const userController = {
    //CREATE Admin
    async addAdmin(req:Request, res:Response) {
        try {
            const userData = {
                name : req.body.name,
                email : req.body.email,
                encryptedPassword : await bcrypt.hash(req.body.password, 10),
                role: 'admin',
            };  
            const user = await userService.addAdmin(userData);
            res.status(201).json({
                status : "OK",
                message:"Admin berhasil ditambahkan!",
                user: user,
            })
        } catch {
            res.status(400).json({
                message : "Admin Gagal Ditambahkan!"
            })
        }
    },

    async findUserByEmail(req:Request, res:Response) {
        try {
            const user = await userService.findUserByEmail(req.body.email);
            res.status(200).json({
                status : "OK",
                user : user, 
            })
        } catch {
            res.status(500).json({
                message: "Gagal mendapatkan data!",
            });
        }
    },

    async findUserById(req:Request, res:Response) {
        try {
            const user = await userService.findUserById(req.body.id);
            res.status(200).json({
                status : "OK",
                user : user, 
            })
        } catch {
            res.status(500).json({
                message: "Gagal mendapatkan data!",
            });
        }
    },

    async whoami(req: Request, res: Response) { 
        res.status(200).json(req.user); 
    },
}