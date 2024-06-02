import {CarsRepository} from '../repositories/carsRepository';
import cloudinary from '../../config/cloudinary';

export const CarsService = {
    async getAllCars() {
        return CarsRepository.getCars();
    },

    async getAvailableCars() {
        return CarsRepository.getAvailableCars();
    },

    async createCar(requestBody : any) {
        return CarsRepository.create(requestBody);
    },

    async updateCar(id:number, requestBody: any) {
        return CarsRepository.update(id, requestBody);
    } ,

    async deleteCar(id:number, deleted_by:string) {
        return CarsRepository.delete(id, deleted_by);
    }
}