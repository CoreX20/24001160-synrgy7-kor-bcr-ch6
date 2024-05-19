import {Router, Request, Response} from 'express';
import { CarsModel } from '../models/CarsModel';
import upload  from '../../middlewares/multer';
import cloudinary from '../../config/cloudinary';
const router = Router()

//GET list cars
router.get('/',async(req:Request, res:Response) => {
    const data = await CarsModel.query(); 
    res.status(200).json({
        message: "OK",
        cars : data
    })
})

//CREATE cars
router.post('/create', upload.single('image'), async(req: Request, res:Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File not valid' });
        }

        const {name,price,start_rent, finish_rent} = req.body;
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
            start_rent,
            finish_rent,
        };     
        
        const data = await CarsModel.query().insert(carData).returning("*");
        res.status(201).json({
            status : "OK",
            message:"Data Berhasil Disimpan!",
            car : data,
        });   
    } catch(error)  {
        res.status(400).json({
            message : "Data Gagal Disimpan!"
        })
    }    
})

//UPDATE specific cars
router.put("/:id", upload.single('image'), async(req:Request, res:Response) => {
    try {
        const getId = req.params.id;
        const {name,price,start_rent, finish_rent} = req.body;
        const updateData :any = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
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
        const newData = await CarsModel.query().findById(getId).throwIfNotFound().patch(updateData);
        res.status(200).json({
            status : "OK",
            message : "Data berhasil Diupdate!",
        })
    } catch {
        res.status(404).json({
            message : "Data not found"
        })
    }
});

//DELETE specific cars
router.delete("/:id", async(req:Request, res:Response) => {
    try {
        const getId = req.params.id;
        const dataDeleted = await CarsModel.query().deleteById(getId).throwIfNotFound();;

        res.status(200).json({
            status:"OK",
            message : "Data berhasil Dihapus!"
        })
    } catch(error) {
        res.status(404).json({
            message : "Data not found"
        })
    }
});
export default router;