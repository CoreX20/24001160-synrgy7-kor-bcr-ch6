import { Model, ModelObject } from 'objection';

export class UserModel extends Model {
    id! : number;
    name! : string;
    email! : string;
    encryptedPassword! : string;
    role! : 'superadmin' | 'admin' | 'member';

    static get tableName() {
        return "users"
    }
    
}

export type User = ModelObject<UserModel>