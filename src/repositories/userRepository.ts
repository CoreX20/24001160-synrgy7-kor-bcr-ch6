import { UserModel } from "../models/UserModel";
import { User } from "../models/UserModel";

export const userRepository = {
    create(userData :User) {
        return UserModel.query().insert(userData).returning("*");
    },

    findEmail(email: string) {
        return UserModel.query().where('email', email).first();
    },

    findId(id:number) {
        return UserModel.query().findById(id);
    }
}