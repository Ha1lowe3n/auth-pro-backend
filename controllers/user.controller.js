import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";

import userService from "../services/user.service.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
        } catch (error) {
            next(error);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            return res.json("get users");
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
