import jwt from "jsonwebtoken";
import tokenModel from "../../models/token.model.js";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: "15d",
        });
        return { accessToken, refreshToken };
    }

    validateToken(token, tokenType) {
        try {
            const userData = jwt.verify(
                token,
                tokenType === "access"
                    ? process.env.JWT_ACCESS_SECRET_KEY
                    : process.env.JWT_REFRESH_SECRET_KEY
            );
            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        return await tokenModel.create({ user: userId, refreshToken });
    }

    async removeToken(refreshToken) {
        return await tokenModel.findOneAndDelete({ refreshToken });
    }

    async findRefreshToken(refreshToken) {
        return await tokenModel.findOne({ refreshToken });
    }
}

export default new TokenService();
