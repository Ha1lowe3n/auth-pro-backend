import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import userModel from "../models/user.model.js";
import emailService from "./access/email.service.js";
import { UserDto } from "../dto/user.dto.js";
import tokenService from "./access/token.service.js";
import { ApiError } from "../exceptions/api-error.js";

const returnTokensAndUserDto = async (user) => {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
};

class UserService {
    async registration(email, password) {
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            throw ApiError.BadRequest("Пользователь уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();
        const newUser = await userModel.create({ email, password: hashPassword, activationLink });
        await emailService.sendActivationEmail(
            email,
            `${process.env.API_URL}/activate/${activationLink}`
        );

        return await returnTokensAndUserDto(newUser);
    }
    async login(email, password) {
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            throw ApiError.BadRequest("Пользователь не найден");
        }
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        return await returnTokensAndUserDto(findUser);
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        console.log(user);
        if (!user) {
            throw ApiError.BadRequest("Неккоректная ссылка активации");
        }
        user.isActivated = true;
        await user.save();
    }
    async refreshCookie(refreshToken) {
        const userData = tokenService.validateToken(refreshToken, "refresh");
        // console.log(first);
        const findRefreshToken = await tokenService.findRefreshToken(refreshToken);
        if (!userData || !findRefreshToken) {
            throw ApiError.AnauthorizedError();
        }

        const user = await userModel.findById(userData.id);
        return await returnTokensAndUserDto(user);
    }
    async getAllUsers() {
        return await userModel.find();
    }
}

export default new UserService();
