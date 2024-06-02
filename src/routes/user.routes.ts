import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/add-admin', authMiddleware.authorize, authMiddleware.superadminMiddleware, userController.addAdmin);
router.get('/whoami', authMiddleware.authorize, userController.whoami);
export default router;
