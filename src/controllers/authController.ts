import { userService } from "../services/userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const authController = {
    async login(req:Request, res:Response) {
        const {email, password} = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message : "Email tidak ditemukan!" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.encryptedPassword);
        if (!isPasswordCorrect) {
            return res.status(404).json({ message : "Password salah!" });
        }
        const token = jwt.sign({id:user.id, name: user.name, email : user.email}, process.env.JWT_SIGNATURE_KEY || "Rahasia");

        res.status(200).json({
            id : user.id,
            name : user.name,
            email : user.email,
            token : token,
        })
    },

    async register(req:Request, res:Response) {
        try {
            const {name, email} = req.body;
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await userService.createUser({name, email,encryptedPassword, role:'member'});
            res.status(201).json({
                name: user.name,
                email : user.email,
                role : user.role
            }) 
        } catch {
            res.status(404).json({
                message : "Data tidak berhasil diinput!"
            })
        }
    }
}