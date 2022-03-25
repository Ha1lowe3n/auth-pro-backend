import { Router } from "express";

import userController from "../controllers/user.controller.js";

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login");
router.post("/logout");
router.get("/users", userController.getUsers);
router.get("/activate/:link", userController.activate);
router.get("/refresh");

export default router;
