import userService from "../services/user.service.js";

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
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            console.log(error);
        }
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
}

export default new UserController();
