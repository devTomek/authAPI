import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { requireJwt } from "../middlewares/requireJwt.js";
import protectedUsersRouter from "./protectedUsers.js";

const router: Router = Router();

router.post("/login", authController.login);
router.use("/users", requireJwt, protectedUsersRouter);

export default router;
