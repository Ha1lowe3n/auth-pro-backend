import { ApiError } from "../exceptions/api-error.js";
import tokenService from "../services/access/token.service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.AnauthorizedError());
        }

        console.log("authorizationHeader");

        const accessToken = authorizationHeader.split(" ")[1];
        if (!authorizationHeader) {
            return next(ApiError.AnauthorizedError());
        }
        console.log("accessToken");

        const userData = tokenService.validateToken(accessToken, "access");
        if (!userData) {
            return next(ApiError.AnauthorizedError());
        }
        console.log("userData");

        req.user = userData;
        next();
    } catch (error) {
        return next(ApiError.AnauthorizedError());
    }
};
