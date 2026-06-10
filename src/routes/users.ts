import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router: Router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);

export default router;
