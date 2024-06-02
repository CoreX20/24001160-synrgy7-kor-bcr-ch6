import {Router} from 'express';
import upload  from '../middlewares/multer';
import { CarsController } from '../controllers/carsController';
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router()

//GET list cars
router.get('/', CarsController.getAllCars);

//GET list of available cars
router.get('/available', CarsController.getAvailableCars);

//CREATE cars
router.post('/create', authMiddleware.authorize, authMiddleware.adminMiddleware, upload.single('image'), CarsController.createCar);

//UPDATE specific cars
router.put("/:id", authMiddleware.authorize, authMiddleware.adminMiddleware, upload.single('image'), CarsController.updateCar);

//DELETE specific cars
router.delete("/:id", authMiddleware.authorize, authMiddleware.adminMiddleware, CarsController.deleteCar);

export default router;