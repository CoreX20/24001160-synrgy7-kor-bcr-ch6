import { CarsModel } from "../models/CarsModel";

export const CarsRepository = {
    getCars() {
        return CarsModel.query().where('deleted_at', null); 
    },

    getAvailableCars() {
        return CarsModel.query().where('available', true).where('deleted_at', null);
    },

    create(carData :any) {
        return CarsModel.query().insert(carData).returning("*");
    },

    update(getId : number, updateData :any) {
        return CarsModel.query().findById(getId).throwIfNotFound().where('deleted_at', null).patch(updateData);
    },

    delete(getId : number, deleted_by: string) {
        return CarsModel.query().findById(getId).throwIfNotFound().where('deleted_at', null).patch({ deleted_at: new Date(), deleted_by: deleted_by});
    }

}
