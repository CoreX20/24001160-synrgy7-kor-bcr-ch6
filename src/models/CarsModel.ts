import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
    id! : number;
    name! : string;
    price! : number;
    image! : string;
    start_rent! : string;
    finish_rent! : string;
    created_at! : Date;
    updated_at! : Date;

    static get tableName() {
        return "cars"
    }
}

export type Cars = ModelObject<CarsModel>