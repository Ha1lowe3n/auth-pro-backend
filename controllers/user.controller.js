import userService from "../services/user.service.js";
import tokenService from "../services/access/token.service.js";

class UserController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        try {
        } catch (error) {}
    }
    async logout(req, res) {
        try {
        } catch (error) {}
    }
    async activate(req, res) {
        try {
        } catch (error) {}
    }
    async refresh(req, res) {
        try {
        } catch (error) {}
    }
    async getUsers(req, res) {
        try {
            return res.json("get users");
        } catch (error) {}
    }
    async check(req, res) {
        try {
            const data = await tokenService.check(1234);
            return res.json(data);
        } catch (error) {}
    }
}

export default new UserController();
