import expres from "express";
import userController from "../controllers/userController";
import authenticated from "../middlewares/authenticated";

const router = expres.Router();

router.get("/me", authenticated.check, userController.me);

export default router;
