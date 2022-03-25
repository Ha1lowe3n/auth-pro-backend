import { Router } from "express";
import { body } from "express-validator";

import userController from "../controllers/user.controller.js";

const router = new Router();

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 20 }),
    userController.registration
);
router.post("/login");
router.post("/logout");
router.get("/users", userController.getUsers);
router.get("/activate/:link", userController.activate);
router.get("/refresh");

export default router;
