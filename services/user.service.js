import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import userModel from "../models/user.model.js";
import emailService from "./access/email.service.js";
import { UserDto } from "../dto/user.dto.js";
import tokenService from "./access/token.service.js";

class UserService {
    async registration(email, password) {
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            throw new Error(`Пользователь с таким почтовым адресом уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();
        const newUser = await userModel.create({ email, password: hashPassword, activationLink });
        await emailService.sendActivationEmail(
            email,
            `${process.env.API_URL}/activate/${activationLink}`
        );

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
    async login(req, res) {}
    async logout(req, res) {}
    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        console.log(user);
        if (!user) {
            throw new Error("Неккоректная ссылка активации");
        }
        user.isActivated = true;
        await user.save();
    }
    async refresh(req, res) {}
    async getUsers(req, res) {}
}

export default new UserService();
