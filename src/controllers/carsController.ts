import { Request, Response } from 'express';
import { CarsService } from "../services/carsService";
import cloudinary from '../../config/cloudinary';

export const CarsController = {
    //GET List Cars
    async getAllCars(req:Request, res: Response) {
        try {
            const data = await CarsService.getAllCars(); 
            res.status(200).json({
                message: "OK",
                cars : data
            })
        } catch {
            res.status(500).json({
                message: "Gagal mendapatkan data!",
            });
        }
    },

    async getAvailableCars(req:Request, res:Response) {
        try {
            const data = await CarsService.getAvailableCars(); 
            res.status(200).json({
                message: "OK",
                cars : data
            })
        } catch {
            res.status(500).json({
                message: "Gagal mendapatkan data!",
            });
        }
    },

    //CREATE a Car
    async createCar(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'File not valid' });
            }
            
            const {name, available, price,start_rent, finish_rent} = req.body;
            if(!name || !price || !start_rent || !finish_rent) {
                return res.status(400).json({
                    error: "Invalid input"
                })
            }
            const fileBase64 = req.file.buffer.toString('base64');
            const file = `data:${req.file.mimetype};base64,${fileBase64}`;
            const result = await cloudinary.uploader.upload(file, {
                folder:'bcr',
                use_filename:true       
            })
            
            const carData = {
                name,
                price,
                image: result.url,
                available,
                start_rent,
                finish_rent,
                created_by : '',
            };     
            if (req.user && 'name' in req.user) {
                carData.created_by = req.user.name as string;
            }
            
            const data = await CarsService.createCar(carData);
            res.status(201).json({
                status : "OK",
                message:"Data Berhasil Disimpan!",
                car : data,
            });   
        } catch(error)  {
            res.status(400).json({
                message : "Data Gagal Disimpan!",
                error : error
            })
        }    
    },

    //UPDATE specific cars
    async updateCar(req: Request, res : Response) {
        try {
            const getId = req.params.id;
            const {name,price, available, start_rent, finish_rent} = req.body;
            const updateData :any = {};
            if (name) updateData.name = name;
            if (price) updateData.price = price;
            if (available) updateData.available = available;
            if (start_rent) updateData.start_rent = start_rent;
            if (finish_rent) updateData.finish_rent = finish_rent;
            if(req.file) {
                const fileBase64 = req.file.buffer.toString('base64');
                const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                const image = await cloudinary.uploader.upload(file, {
                    folder:'bcr',
                    use_filename : true
                });
                updateData.image = image.url;
            }
            if (req.user && 'name' in req.user) {
                updateData.updated_by = req.user.name as string;
            }
            await CarsService.updateCar(Number(getId), updateData);
            res.status(200).json({
                status : "OK",
                message : "Data berhasil Diupdate!",
            })
        } catch {
            res.status(404).json({
                message : "Data not found"
            })
        }
    },

    //DELETE specific cars
    async deleteCar(req:Request, res: Response) {
        try {
            const getId = req.params.id;
            if (req.user && 'name' in req.user) {
                const deleted_by = req.user.name as string;
                await CarsService.deleteCar(Number(getId), deleted_by);
            }
                     
            res.status(200).json({
                status:"OK",
                message : "Data berhasil Dihapus!"
            })
        } catch(error) {
            res.status(404).json({
                message : "Data not found"
            })
        }
    }
}