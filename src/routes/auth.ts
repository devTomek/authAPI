import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router: Router = Router();

router.post("/login", authController.login);

export default router;
