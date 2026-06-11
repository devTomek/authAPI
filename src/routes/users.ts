import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { requireJwt } from "../middlewares/requireJwt.js";

const router: Router = Router();

router.get("/", requireJwt, userController.getUsers);
router.post("/", userController.createUser);
router.patch("/:id", requireJwt, userController.updateUser);
router.delete("/:id", requireJwt, userController.deleteUser);

export default router;
