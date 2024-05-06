import expres from "express";
import authController from "../controllers/authController";

const router = expres.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;