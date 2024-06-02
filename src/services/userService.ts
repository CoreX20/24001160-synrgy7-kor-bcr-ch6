import { User } from "../models/UserModel";
import { userRepository } from "../repositories/userRepository";

export const userService = {
    async createUser(userData:any) {
        return userRepository.create(userData);
    },

    async addAdmin(userData:any) {
        return userRepository.create({...userData, role:'admin'})
    },

    async findUserByEmail(email:string) {
        return userRepository.findEmail(email);
    },

    async findUserById(id:number) {
        return userRepository.findId(id);
    }
}