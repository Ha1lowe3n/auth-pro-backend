import jwt from "jsonwebtoken";
import tokenModel from "../../models/token.model.js";
import mongoose from "mongoose";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: "15d",
        });
        return { accessToken, refreshToken };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenModel.save();
        }
        return await tokenModel.create({ user: userId, refreshToken });
    }

    async check(userId) {
        console.log("chekc");
        const mid = mongoose.Types.ObjectId(userId);
        console.log(mid);
        const tokenData = await tokenModel.findOne({ user: mongoose.Types.ObjectId(userId) });
        console.log("chekc 2'");
        if (tokenData) {
            return "suka";
        }
        return "blyat";
    }
}

export default new TokenService();
