import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { requireJwt } from "../middlewares/requireJwt.js";

const router: Router = Router();

router.use(requireJwt);

router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
